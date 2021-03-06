(function(){

  angular
   .module('customers')
   .controller('CustomersController', [
    'customerService',
    'toastService',
    '$state',
    '$stateParams',
    '$mdDialog',
    CustomersController
  ]);

  function CustomersController(customerService, toastService, $state, $stateParams, $mdDialog) {
    var vm = this;

    // Load all registered customers
    customerService
      .all()
      .then( function( customers ) {
        vm.customers = [].concat(customers);
      });

    var destroyIt = function(customer) {
      customerService
        .destroy(customer)
        .then(function() {
          vm.customers.splice(vm.customers.indexOf(customer), 1);
          toastService.showActionToast('Successfully deleted!');
        })
    };

    vm.destroy = function(customer) {
      confirm = $mdDialog
        .confirm()
        .title('Delete Confirmation')
        .textContent('Are you sure to delete this customer?')
        .ariaLabel('Confirm')
        .ok('Confirm')
        .cancel('Cancel');

      $mdDialog
        .show(confirm)
        .then(function() {
          destroyIt(customer);
        });
    };
  }

})();