angular.module("umbraco").controller(
    'newsletterStudioExtensions.controller.customContentPickerControl.EditController',
    ['$scope', 'editorService', function ($scope, editorService) {

        var editVm = this;

        // Initialize the control
        editVm.init = function (emailEditor, control) {
            editVm.control = control;
            editVm.toggleOptionsAlign = [
                { title: 'Left', value: 'left', iconSvg: '<svg>...</svg>' },
                { title: 'Center', value: 'center', iconSvg: '<svg>...</svg>' },
                { title: 'Right', value: 'right', iconSvg: '<svg>...</svg>' }
            ];

            editVm.ratesDisclaimerRte = {
                view: 'rte',
                value: control.title || '',
                config: {
                    editor: {
                        toolbar: ["undo", "redo", "bold", "italic", "alignleft", "aligncenter", "alignright", "bullist", "numlist", "link", "unlink"],
                        stylesheets: [],
                        mode: 'classic'
                    }
                }
            };
        };

        // Open content picker
        editVm.openContentPicker = function () {
            editorService.contentPicker({
                multiPicker: false,
                submit: function (model) {
                    if (model.selection.length) {
                        editVm.control.selectedContent = model.selection[0].id;
                    }
                    editorService.close();
                },
                close: function () {
                    editorService.close();
                }
            });
        };

        // Toggle image visibility
        editVm.toggle = function () {
            editVm.control.showImage = !editVm.control.showImage;
        };

        // Toggle override title
        editVm.overrideTitleToggle = function () {
            editVm.control.overrideTitle = !editVm.control.overrideTitle;
        };

        // Watch for changes in RTE value
        $scope.$watch(() => editVm.ratesDisclaimerRte.value, function (newVal) {
            editVm.control.title = newVal.markup;
        });

        // Handle control change event
        var evtHandler = $scope.$on('nsSelectedControlChanged', function (event, control) {
            editVm.init(null, control);
        });

        // Clean up event listener on destroy
        $scope.$on('$destroy', function () {
            evtHandler();
        });

        return editVm;
    }]
);
