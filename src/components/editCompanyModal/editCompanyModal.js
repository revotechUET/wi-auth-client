import template from './editCompanyModal.html';

const name = 'editCompanyModal';

controller.$inject = ['company'];
function controller(company) {
    let self = this;

    self.$onInit = function() {
        preProcess();
    }

    self.onSubmit = function(){
        checkSubmit(() => {
            const data = Object.assign({
                idCompany: self.idCompany
            }, self.company)

            company.editCompany(data, (err, resp) => {
                if(err) {
                    self.errMsg = err.content || err.statusText;
                    self.sucMsg = '';
                } else {
                    self.sucMsg = resp.reason;
                    self.errMsg = '';
                    self.editCompanySuccess();
                }
            })
        })
    }

    self.onClose = function() {
        preProcess();
    }

    function checkSubmit(fullfill) {
        if(!self.company.name){
            self.errMsg = 'name is required';
            self.sucMsg = '';
        } else {
            fullfill();
        }
    }

    function preProcess() {
        self.name = 'edit-company-modal';
        self.company = {};
        self.sucMsg = '';
        self.errMsg = '';
    }
}


export default {
    name,
    options: {
        bindings: {
            editCompanySuccess: '<',
            idCompany: '<'
        },
        template,
        controller,
        controllerAs: 'self'
    }
};