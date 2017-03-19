var addNewView = Backbone.View.extend({
  tagName: 'a',
  className: 'list',
  tmpl: _.template(`				<a class="navbar-brand" href="#">
  					TESTING
  				</a>
  `),
  events: {
    'dblclick .list-group-item.view': 'edit',
    'click button.delete': 'onDeleteItem',
    'click button.save': 'onSave',
    'click button.cancel': 'onCancel'
  },

  initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.tmpl(this.model.attributes));
      this.$viewTitle = this.$el.find('.view .title');
      this.$viewContent  = this.$el.find('.view .content');
      this.$viewDelete = this.$el.find('.view .delete');
      this.$editTitle = this.$el.find('.edit .title');
      this.$editContent = this.$el.find('.edit .content');
      this.$editSave = this.$el.find('.edit .save');
      let addItemView = new AddItemView(this.coll);
      $appHeader.append(addNewView.render().el);
      $appHeader.after(this.$el);
      return this;
    },

  onSave: function () {

    this.model.set({
      'title' : this.$editTitle.val(),
      'content' : this.$editContent.val(),
      'lastModified' : new Date().getTime()
    });
    if(this.model.isValid()) {
      this.$el.addClass('view');
      this.$el.removeClass('edit');
      $('#table-view').find('.search-input').val('');
      this.model.collection.sort();
    } else {
      alert(this.model.get("title") + " " + this.model.validationError);
    }

  },

  onCancel: function() {
    this.$el.addClass('view');
    this.$el.removeClass('edit');
    this.render();
  },

  onDeleteItem: function (e) {
    this.model.destroy();
    this.remove();
  }
});
