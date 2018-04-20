var ProductList = (function () {
    var options = {
        valueNames: [ 'sku', 'name', 'status', 'stock' ],
        item: '<li class="Table__row js-product-row"><div class="sku Table__cell" data-mobile="Sku"></div><div class="name Table__cell" data-mobile="Name"></div><div class="status Table__cell" data-mobile="Status"></div><div class="stock Table__cell" data-mobile="Stock"></div><div class="Table__cell" data-mobile="Actions"><button type="button" class="js-button-edit"><span>Edit</span></button><button type="button" class="js-button-remove"><span>Delete</span></button></div></li>'
    };

    var values = [
        { sku: 'product1', name:'Product 1', status: 'Enabled', stock: 'In Stock' },
        { sku: 'product2', name:'Product 2', status: 'Enabled', stock: 'Out of Stock' },
        { sku: 'product2', name:'Product 2', status: 'Enabled', stock: 'Out of Stock' },
        { sku: 'product2', name:'Product 2', status: 'Enabled', stock: 'Out of Stock' },
        { sku: 'product2', name:'Product 2', status: 'Enabled', stock: 'Out of Stock' },
        { sku: 'product3', name:'Product 3', status: 'Disabled', stock: 'In Stock' }
    ];

    var tableList = new List('js-table-list', options, values);

    var buttonEdit = $('.js-button-edit');
    var buttonRemove = $('.js-button-remove');
    var buttonSave = $('.js-button-save');
    var buttonAdd = $('.js-button-add');

    var sortSku = $('.js-sort-sku');
    var sortName = $('.js-sort-name');

    var editTable = $('.js-edit-table');

    var productRowClass = '.js-product-row';

    var fieldSKU = $('.js-edit-sku');
    var fieldName = $('.js-edit-name');
    var fieldStatus = $('.js-edit-status');
    var fieldStock = $('.js-edit-stock');

    return {
        init: function () {
            this.initEvents();
        },
        initEvents: function () {
            this.updateElementsBind();
            var _self = this;

            buttonAdd.click(function() {
                _self.clearFields();
                editTable.show();
            });

            buttonSave.click(function() {
                var item = tableList.get('sku', fieldSKU.text())[0];
                if (typeof item !== 'undefined') {
                    item.values({
                        sku: fieldSKU.text(),
                        name: fieldName.val(),
                        status: fieldStatus.val(),
                        stock: fieldStock.val()
                    });
                } else {
                    tableList.add({
                        sku: fieldSKU.text() + Math.floor(Math.random()*110000),
                        name: fieldName.val() ? fieldName.val() : 'Product default name',
                        status: fieldStatus.val(),
                        stock: fieldStock.val()
                    });
                }
                editTable.hide();
                _self.updateElementsBind();
            });

            sortSku.click(function(e){
                if ($(e.target).hasClass('js-asc')) {
                    tableList.sort('sku', { order: "asc" });
                } else {
                    tableList.sort('sku', { order: "desc" });
                }
            });

            sortName.click(function(e){
                if ($(e.target).hasClass('js-asc')) {
                    tableList.sort('name', { order: "asc" });
                } else {
                    tableList.sort('name', { order: "desc" });
                }
            });
        },
        clearFields: function () {
            var fieldSKU = $('.js-edit-sku').text('');
            var fieldName = $('.js-edit-name').val('');
            var fieldStatus = $('.js-edit-status');
            var fieldStock = $('.js-edit-stock');
        },
        updateElementsBind: function () {
            var _self = this;
            var buttonEdit = $('.js-button-edit');
            var buttonRemove = $('.js-button-remove');

            buttonEdit.click(function(){
                var fieldSkuVal = $(this).closest(productRowClass).find('.sku').text();
                var itemValues = tableList.get('sku', fieldSkuVal)[0].values();
                fieldSKU.text(itemValues.sku);
                fieldName.val(itemValues.name);
                $(".js-edit-stock option[value='" + itemValues.stock + "']").prop('selected', true);
                $(".js-edit-status option[value='" + itemValues.status + "']").prop('selected', true);

                editTable.show();
            });

            buttonRemove.click(function() {
                var fieldSkuVal = $(this).closest(productRowClass).find('.sku').text();
                tableList.remove('sku', fieldSkuVal);
                _self.clearFields();
                editTable.hide();
            });
        }
    }
})();

var Menu = (function () {
    var menuTrigger = $('.js-menu-trigger');
    var menuCloseTrigger = $('.js-menu-close-trigger');
    var menu = $('.js-menu');
    var menuContent = $('.js-menu-content');
    var tabs = $('.js-tabs');

    return {
        init: function () {
            this.copyMenu();
            this.initEvent();
        },
        initEvent: function () {
            menuTrigger.click(function(){
                menu.fadeIn();
            });
            menuCloseTrigger.click(function(e){
                e.stopPropagation();
                menu.fadeOut();
            });
        },
        copyMenu: function () {
            var menuItems = tabs.find('label');
            menuItems.clone().removeClass('Tabs__label').appendTo(menuContent);
        }
    }
})();
