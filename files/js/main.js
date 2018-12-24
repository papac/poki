$(function () {
    $('#addcategorymodal').on('hide.bs.modal', function () {
        $(this).find('#newcategorymodalform input[name="name"]').val('');
        $(this).find('#newcategorymodalform input[name="editing"]').val('0');
        $('#addfieldmodal .modal-title').text('Add new category');
        $('.deletecategorybtn').hide();
    });

    autocomplete.init($('.app-search .form-control')[0], {parent: $('.content-page')[0], top: 70});
});

function saveCategoryField(path) {
    loader.show();
    var $form = $('#newcategorymodalform');
    var edition = $('#newcategorymodalform #editingcategory').val();
        edition = edition != '0' ? edition : 0;
    $.ajax({
        url: $form[0].action,
        type: 'post',
        data: $form.serialize(),
        dataType: 'json',
        success: function (response) {
            if (!response.error) {
                $('#addcategorymodal').modal('hide');
                alerter.success('Category <b>'+ response.name +'</b> '+(edition!=0 ? 'modified':'added')+' !');
                window.location.href = path + '/' + response.name;
            }
            else {
                loader.hide();
                alerter.error(response.message);
                $('input[name="_token"]').val(response.newtoken);
            }
        },
        error: function (err) {
            console.log(err);
            alerter.error('An error occured ! Check your connexion and try again later.');
            loader.hide();
        }
    });
}

function postize(url, type, datas, success, error, letloader) {
    loader.show();
    $.ajax({
        url: url,
        type: type || 'get',
        data: datas,
        dataType: 'json',
        success: function (response) {
            if (!letloader) loader.hide();
            if (response.error) {
                if (error) error(response);
            }
            else {
                if (success) success(response);
            }
            if (response.newtoken) $('input[name="_token"]').val(response.newtoken);
        },
        error: function (err) {
            if (error) error({message: "An error occured ! Check your connexion and try again later.", err: err});
            if (!letloader) loader.hide();
        }
    });
}

function warningAction(doaction) {
    $.confirm({
        title: 'Are you sure ?',
        content: 'Do you really want to continue ?<br>You could not come back after this action.',
        type: 'red',
        theme: 'modern',
        icon: 'fa fa-warning',
        buttons: {
            continue: {
                btnClass: 'btn btn-danger',
                action: function () {
                    doaction();
                }
            },
            cancel: {}
        }
    });
}

var autocomplete = {
    box: null,
    parent: null,

    setBox: function (options) {
        autocomplete.box = document.createElement('div');
        autocomplete.box.style.position = 'absolute';
        autocomplete.box.style.top = (options.parent.offsetTop + options.top) + 'px';
        autocomplete.box.style.left = options.parent.offSetLeft + 'px';
        autocomplete.box.style.width = '100%';
        autocomplete.box.style.minHeight = '100px';
        autocomplete.box.style.zIndex = '1';
        autocomplete.box.style.background = '#fff';

        this.parent = options.parent;
    },

    init: function (elt, options) {
        if (!autocomplete.box) {
            this.setBox(options);
        }

        elt.addEventListener('keyup', function (e) {
            if (this.value.length) {
                autocomplete.doSeach(this.value);
            }
            else {
                autocomplete.hideBox();
            }
        });
    },

    doSeach(keyword) {
        this.showBox();
    },

    showBox: function () {
        this.parent.appendChild(autocomplete.box);
    },

    hideBox: function () {
        this.parent.removeChild(this.box);
    },

    getTemplate: function (item) {
        return '<div>' +
                    '<div class="pk-left">'+
                        '<img src="http://via.placeholder.com/50x50">'+
                    '</div>'+
                    '<div class="pk-right">'+
                        '<b>'+ item.number +' results</b>'+
                        '<b>Found in category '+ item.category +'</b>'+
                    '</div>'+
                '</div>';
    }
};