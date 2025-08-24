public class DropdownElements
{
    public string id { get; set; }
    public string enValue { get; set; }
    public string arValue { get; set; }
}

public class Option
{
    public string name { get; set; }
    public string value { get; set; }
}

public class ModuleDetailes
{
    public string name { get; set; }
    public string type { get; set; }
    public string group { get; set; }
    public string id_name { get; set; }
    public string label { get; set; }
    public bool required { get; set; }
    public Dictionary<string, Option> options { get; set; }
}

public class ResponseData
{
    public string module_name { get; set; }
    public string table_name { get; set; }
    public Dictionary<string, ModuleDetailes> module_fields { get; set; }
}