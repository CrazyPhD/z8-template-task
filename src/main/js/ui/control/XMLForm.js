Z8.define('org.zenframework.z8.template.controls.XMLForm', {
	extend: 'Z8.form.field.TextArea',
	
	autoSave: true,
	XMLEditor: null,
	contentLoaded: false,
	
	afterRender: function() {
		var subcomponents = this.subcomponents();

		for(var i = 0, length = subcomponents.length; i < length; i++) {
			var component = subcomponents[i];
			if(component == null || component.afterRenderCalled)
				continue;
			if(component.isComponent) {
				component.afterRender();
				component.afterRenderCalled = true;
			}
		}

		if(this.renderOptions != null)
			Z8.callback(this.renderOptions);
			
		this.initCodeMirror();
	},
	
	initCodeMirror: function() {
		var textarea = this.input;
		
		this.XMLEditor = CodeMirror.fromTextArea(textarea, {
			mode: "xml"
		});
		
		this.XMLEditor.on('change', function() {
			this.setValue(this.XMLEditor.getDoc().getValue());
		}.bind(this));
	},
	
	validate: function() {
		if (this.XMLEditor !== null  && !this.contentLoaded) {
			this.XMLEditor.getDoc().setValue(this.getValue());
			this.contentLoaded = true;
		} else {
			if (this.XMLEditor !== null && this.XMLEditor.getDoc().getValue() !== this.getValue()) {
				this.XMLEditor.getDoc().setValue(this.getValue());
			}
		}
	},
	
	
});