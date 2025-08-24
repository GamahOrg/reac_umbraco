using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Strings;
using Newtonsoft.Json;
using System.Data.SqlClient;
using uSync.Core;

namespace Umbraco10Project.Controllers
{
    public class MigrationController : SurfaceController
    {
        public List<string> erroredNews = new();
        private readonly MediaFileManager _mediaFileManager;
        private readonly IMediaService _mediaService;
        private readonly MediaUrlGeneratorCollection _mediaUrlGeneratorCollection;
        private readonly IShortStringHelper _shortStringHelper;
        private readonly IContentTypeBaseServiceProvider _contentTypeBaseServiceProvider;
        private readonly IContentService _contentService;
        public MigrationController(IContentService contentService,IContentTypeBaseServiceProvider contentTypeBaseServiceProvider,IShortStringHelper shortStringHelper ,MediaUrlGeneratorCollection mediaUrlGenerators, IMediaService mediaService, MediaFileManager mediaFileManager, IUmbracoContextAccessor umbracoContextAccessor, IUmbracoDatabaseFactory databaseFactory, ServiceContext services, AppCaches appCaches, IProfilingLogger profilingLogger, IPublishedUrlProvider publishedUrlProvider) : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
            _mediaFileManager = mediaFileManager;
            _mediaService = mediaService;
            _mediaUrlGeneratorCollection = mediaUrlGenerators;
            _shortStringHelper = shortStringHelper;
            _contentTypeBaseServiceProvider = contentTypeBaseServiceProvider;
            _contentService = contentService;
        }
        public  string ExtractText(HtmlNode node)
        {
            if (node.NodeType == HtmlNodeType.Text)
            {
                return node.InnerText;
            }

            if (node.NodeType == HtmlNodeType.Element && node.Name != "script" && node.Name != "style")
            {
                string result = "";
                foreach (HtmlNode child in node.ChildNodes)
                {
                    result += ExtractText(child) + " ";
                }
                return result.Trim();
            }

            return "";
        }


        public string GetnewsImagesVal(string imgUrl)
        {
            var media = _mediaService.GetMediaByPath(imgUrl);
            string key = media.Key.ToString();
            List<dynamic> valsList = new List<dynamic>();
            Guid newGuid = Guid.NewGuid();
            string guid = newGuid.ToString();
            var valItem = new { key = guid, mediaKey = key };
            valsList.Add(valItem);
            string val = JsonConvert.SerializeObject(valsList);
            return val;
        }
        public void setImages()
        {
            List<int> imagesIds = new List<int>() { 2804,2806};
            string val = "";
            List<dynamic> valsList = new List<dynamic>();

            foreach (var id in imagesIds)
            {
                var media = _mediaService.GetById(id);
                string key = media.Key.ToString();
                Guid newGuid = Guid.NewGuid();
                string guid = newGuid.ToString();
                var valItem = new { key = guid, mediaKey = key };
                valsList.Add(valItem);
            }
            val = JsonConvert.SerializeObject(valsList);

            IContent content = _contentService.GetById(2762);
            content.SetValue("newsImages", val);
            _contentService.SaveAndPublish(content);
        }
        public async Task CreateNode(string title,DateTime createDate,string text,string photo)
        {
            //IContentService contentService = Services.ContentService;
            var newsNode = UmbracoContext.Content.GetById(1273);

            var parentUDI = new GuidUdi("news", newsNode.Key);

            var content = _contentService.CreateContent(title, parentUDI, "newsDetails");
           
            text = await ReplaceImagesSrc(text, title);
            
            try
            {
                content.SetValue("newsTitle", title);
                content.SetValue("pageTitle", title);
                content.SetValue("newsDate", createDate);
                content.SetValue("newsText", text);
                try
                {
                    if (!string.IsNullOrWhiteSpace(photo))
                    {
                        string photoUrl = ReadImage(photo, title);
                        string newsImagesVal = GetnewsImagesVal(photoUrl);
                        content.SetValue("newsImages", newsImagesVal);
                    }

                }
                catch (Exception ex)
                {
                    string message = ex.Message;
                }
               
                _contentService.SaveAndPublish(content);
            }
            catch(Exception ex)
            {
                string messeage = ex.Message;
                erroredNews.Add(title);
            }
           

        }
        public string Base64ToStream(string base64,string title)
        {
            base64 = base64.Replace("data:image/png;base64,", string.Empty);
            byte[] imageBytes = Convert.FromBase64String(base64);
            MemoryStream c = new MemoryStream(imageBytes);
            string path = UploadImage(c,title);
            return path;
        }
        public string ReadImage(string path,string title)
        {
            string name = Path.GetFileName(path);
            path = $"new-images/{name}";
            using (Stream stream = System.IO.File.OpenRead(path)){
                string url = UploadImage(stream, title);
                return url;
            }
        }
        public string UploadImage(Stream stream,string title)
        {
            //IMediaService _mediaService = Services.MediaService;
            IMedia targetFolder = _mediaService.GetById(2335);
            if (targetFolder != null && targetFolder.ContentType.Alias == Constants.Conventions.MediaTypes.Folder)
            {
                var contentTypeBaseServiceProvider = Services.ContentTypeBaseServices;
                //string path = "NewsImages/avatar-admin.png";

                using ( stream )
                //using (Stream stream = System.IO.File.OpenRead(path))
                {
                    // Initialize a new image at the root of the media archive
                    IMedia media = _mediaService.CreateMedia(title, 2335, Constants.Conventions.MediaTypes.Image);
                    // Set the property value (Umbraco will handle the underlying magic)
                    media.SetValue(_mediaFileManager, _mediaUrlGeneratorCollection, _shortStringHelper, _contentTypeBaseServiceProvider, Constants.Conventions.Media.File, $"{title}.jpg", stream);

                    // Save the media
                    var result = _mediaService.Save(media);
                    string mediaurl = media.GetUrl("umbracoFile", _mediaUrlGeneratorCollection);

                    return mediaurl;
                }
            }
            return "";
        }
        async Task<string> externalLinkToStream(string url,string title)
        {
            using (HttpClient client = new HttpClient())
            {
                // Download the image bytes from the URL
                byte[] imageBytes = await client.GetByteArrayAsync(url);

                // Create a MemoryStream from the downloaded bytes
                Stream imageStream = new MemoryStream(imageBytes);
                string path = UploadImage(imageStream, title);
                return path;
            }
        }
        async Task<string> ReplaceImagesSrc(string html,string title)
        {
            HtmlDocument doc = new HtmlDocument();
            doc.LoadHtml(html);

            // Select all <img> tags in the document
            var imgNodes = doc.DocumentNode.SelectNodes("//img");

            if (imgNodes != null)
            {
                // Remove each <img> tag from the document
                foreach (var imgNode in imgNodes)
                {
                    string src = imgNode.Attributes["src"].Value;
                    var srcAttribute = imgNode.Attributes["src"];
                    if (srcAttribute != null)
                    {
                        if (src.Contains("base64,"))
                        {
                            string newpath = Base64ToStream(src, title);
                            srcAttribute.Value = newpath;

                            //imgNode.Remove();
                        }
                        else
                        {
                            try
                            {
                                string newpath = await externalLinkToStream(src, title);
                                srcAttribute.Value = newpath;
                            }
                            catch(Exception ex) { 

                            }
                        }
                    }
                    
                  
                }
            }

            // Get the HTML content after removing <img> tags
            string result = doc.DocumentNode.OuterHtml;
            return result;
        }
      
        //https://localhost:44318/umbraco/surface/migration/migrate
        //https://localhost:44318/umbraco/surface/migration/uploadimage
        public async Task<IActionResult> Migrate()
        {
            string connectionString = "Server=localhost\\SQLEXPRESS01;Database=Raga_Gov;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True";
            string queryString = "SELECT * FROM [Raga_Gov].[dbo].[tbl_News] where Language = 'Arabic'";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                using (command)
                using (SqlDataReader reader = command.ExecuteReader())
                { 
                    while (reader.Read())
                    {
                        string title = reader.GetString(1);
                        string photo = reader.GetString(2);

                        DateTime createDate = reader.GetDateTime(3);
                        string html = reader.GetString(9);

                        HtmlDocument doc = new HtmlDocument();
                        doc.LoadHtml(html);
                        string text = doc.Text;
                        string extractedText = ExtractText(doc.DocumentNode);
                        await CreateNode(title, createDate, html,photo);
                    }
                }
            }
            return View();
        }
    }
}
