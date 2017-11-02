/*
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox'
    , 'ojs/ojbutton', 'promise', 'ojs/ojtable', 'ojs/ojarraytabledatasource',
'ojs/ojinputtext', 'ojs/ojinputnumber', 'ojs/ojlabel'],
 function(oj, ko, $) {
  
    function DashboardViewModel() {
        var self = this;
        self.val = ko.observable();
        self.val2 = ko.observable();
        self.modules = ko.observableArray([
            {value: 'Inventory', label: 'Inventory'},
            {value: 'Costing',    label: 'Costing'},
            {value: 'Fulfillment',   label: 'Fulfillment'}
        ]);
        self.isDisabled=ko.observable(true);
        self.brObjects = ko.observableArray([
            {value: 'Profile setups', label: 'Profile setups'},
            {value: 'Other setups',    label: 'Other setups'}
        ]);
      
        self.valueChangeHandler = function (event) {
            if (event['type'] == "valueChanged") {
                var newVal = event['detail']['value'];

                if (newVal == "Inventory"){
                    self.isDisabled(false);
                }
                else {
                    self.val2('');
                    self.isDisabled(true);
                }
                $('#changelog').html("Value Change: " + JSON.stringify(newVal, null, 4));
            }
        
        }
    
        self.clickedButton = ko.observable("(None clicked yet)");
        self.buttonClick = function(event){
            self.clickedButton(event.currentTarget.id);
            return true;
        }
        
        var deptArray = [{DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
        {DepartmentId: 556, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
        {DepartmentId: 10, DepartmentName: 'Administration', LocationId: 200, ManagerId: 300},
        {DepartmentId: 20, DepartmentName: 'Marketing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 30, DepartmentName: 'Purchasing', LocationId: 200, ManagerId: 300},
        {DepartmentId: 40, DepartmentName: 'Human Resources1', LocationId: 200, ManagerId: 300},
        {DepartmentId: 50, DepartmentName: 'Administration2', LocationId: 200, ManagerId: 300},
        {DepartmentId: 60, DepartmentName: 'Marketing3', LocationId: 200, ManagerId: 300},
        {DepartmentId: 70, DepartmentName: 'Purchasing4', LocationId: 200, ManagerId: 300},
        {DepartmentId: 80, DepartmentName: 'Human Resources5', LocationId: 200, ManagerId: 300},
        {DepartmentId: 90, DepartmentName: 'Human Resources11', LocationId: 200, ManagerId: 300},
        {DepartmentId: 100, DepartmentName: 'Administration12', LocationId: 200, ManagerId: 300},
        {DepartmentId: 110, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
        {DepartmentId: 120, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
        {DepartmentId: 130, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300}];
        self.deptObservableArray = ko.observableArray(deptArray);
    self.datasource = new oj.ArrayTableDataSource(self.deptObservableArray, {idAttribute: 'DepartmentId'});
    
    //add to the observableArray
    self.addRow = function()
    {
       var dept = {
                     'DepartmentId': self.inputDepartmentId(),
                     'DepartmentName': self.inputDepartmentName(),
                     'LocationId': self.inputLocationId(),
                     'ManagerId': self.inputManagerId()
                  };
        self.deptObservableArray.push(dept);
    };
    
    //used to update the fields based on the selected row
    self.updateRow = function()
    {
        var element = document.getElementById('table');
        var currentRow = element.currentRow;
        
        if (currentRow != null)
        {
            self.deptObservableArray.splice(currentRow['rowIndex'], 1, {
                         'DepartmentId': self.inputDepartmentId(),
                         'DepartmentName': self.inputDepartmentName(),
                         'LocationId': self.inputLocationId(),
                         'ManagerId': self.inputManagerId()
                      });
        }
    };
    
    //used to remove the selected row
    self.removeRow = function()
    {
        var element = document.getElementById('table');
        var currentRow = element.currentRow;

        if (currentRow != null)
        {
            self.deptObservableArray.splice(currentRow['rowIndex'], 1);
        }
    };
    
    //intialize the observable values in the forms
    self.inputDepartmentId = ko.observable();
    self.inputDepartmentName = ko.observable();
    self.inputLocationId = ko.observable();  
    self.inputManagerId = ko.observable();
    self.currentRowTableSelection = ko.observable();
    self.currentRowListener = function(event)
    {
      var data = event.detail;
      if (event.type == 'selectionChanged' && data['value'] != null)
      {
        var rowIndex = data['value'][0]['startIndex']['row'];
        var dept = self.deptObservableArray()[rowIndex];
        self.inputDepartmentId(dept['DepartmentId']);
        self.inputDepartmentName(dept['DepartmentName']);
        self.inputLocationId(dept['LocationId']);
        self.inputManagerId(dept['ManagerId']);
      }
    };
    
    }
        
    return new DashboardViewModel();
  }
);



