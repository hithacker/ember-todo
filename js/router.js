Todos.Router.map(function() {
    this.resource('todos', { path: '/' }, function () {
        //additional child routes will go here later
        this.route('active');
        this.route('completed');
    });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('todos');
    }
})

Todos.CommonRouteLogic = Ember.Mixin.create({
    renderTemplate: function(controller) {
        this.render('todos/index', {controller: controller});
    },
    /**
     * You can use this function to get all todos that are either complete or incomplete depending on the parameter that you pass.
     * @param {boolean} completed - You can choose whether you want to get all complete todos or all incomplete todos.
     */
    getAll: function(completed) {
        return this.store.filter('todo', function(todo) {
            return completed ?
                todo.get('isCompleted') :
                !todo.get('isCompleted');
        });
    }
});

Todos.TodosActiveRoute = Ember.Route.extend(Todos.CommonRouteLogic, {
    model: function() {
        return this.getAll(false);
    }
});

Todos.TodosCompletedRoute = Ember.Route.extend(Todos.CommonRouteLogic, {
    model: function() {
        return this.getAll(true);
    }
})


//Below is the code that has route duplication
/*
Todos.TodosActiveRoute = Ember.Route.extend({
    model: function() {
        return this.store.filter('todo', function(todo) {
            return !todo.get('isCompleted');
        });
    }
    renderTemplate: function(controller) {
        this.render('todos/index', {controller: controller});
    }
});

Todos.TodosCompletedRoute = Ember.Route.extend({
    model: function() {
        return this.store.filter('todo', function(todo) {
            return todo.get('isCompleted');
        });
    }
    renderTemplate: function(controller) {
        this.render('todos/index', {controller: controller});
    }
})
*/