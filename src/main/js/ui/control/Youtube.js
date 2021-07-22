Z8.define('org.zenframework.z8.template.controls.Youtube', {
	extend: 'Z8.form.field.Text',
	ytPattern1: /^https:\/\/www\.youtube\.com\/watch\?v=(.+)/,
	ytPattern2: /^https:\/\/youtu.be\/(.+)/,
	ytVideoBlock: null,
	ytVideoBlockWidth: 350,
	ytVideoBlockHeight: 197,

	validate: function() {
		var value = this.getValue();
		this.setValid(this.isYoutubeLink(value));
		if (this.isYoutubeLink(value)) {
			if (this.ytVideoBlock !== null) {
				this.ytVideoBlock.parentNode.removeChild(this.ytVideoBlock);
			}
			this.ytVideoBlock = this.videoBlockDom(value);
			var container = this.nthParent(this.dom, 3);
			container.insertBefore(this.ytVideoBlock, this.nthParent(this.dom, 2).nextSibling);
		} else {
			if (this.ytVideoBlock !== null) {
				this.ytVideoBlock.parentNode.removeChild(this.ytVideoBlock);
				this.ytVideoBlock = null;
			}
		}
	},
	
	isYoutubeLink: function(value) {
		return (this.ytPattern1.test(value) || this.ytPattern2.test(value));
	},
	
	nthParent: function(el, n) {
		var i = 0;
		while (el.parentElement !== null && i < n) {
			el = el.parentElement;
			i++;
		}
		return el;
	},
	
	videoBlockDom: function(url) {
		var div = document.createElement("div");

		var videoPattern1 = this.ytPattern1.exec(url);
		var videoPattern2 = this.ytPattern2.exec(url);
		
		var videoId = (videoPattern1 !== null ? videoPattern1[1] : videoPattern2[1]);

		div.innerHTML = '<iframe width="'+this.ytVideoBlockWidth+'" height="'+this.ytVideoBlockHeight+'" src="https://www.youtube.com/embed/'+videoId+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		return div;
	}

});