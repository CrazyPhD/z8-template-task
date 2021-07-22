Z8.define('org.zenframework.z8.template.controls.Youtube', {
	extend: 'Z8.form.field.Text',
	ytPattern1: /^https:\/\/www\.youtube\.com\/watch\?v=(.+)/,
	ytPattern2: /^https:\/\/youtu.be\/(.+)/,
	ytVideoBlock: null,
	ytVideoBlockWidth: 560,
	ytVideoBlockHeight: 315,

	validate: function() {
		var value = this.getValue();
		this.setValid(this.isYoutubeLink(value));
		if (this.isYoutubeLink(value)) {
			this.destroyVideoBlock();
			this.ytVideoBlock = this.videoBlockDom(value);
			var container = document.getElementsByClassName("yttab")[0];
			container.appendChild(this.ytVideoBlock);
		} else {
			this.destroyVideoBlock();
		}
	},
	
	isYoutubeLink: function(value) {
		return (this.ytPattern1.test(value) || this.ytPattern2.test(value));
	},
	
	
	videoBlockDom: function(url) {
		var div = document.createElement("div");

		var videoPattern1 = this.ytPattern1.exec(url);
		var videoPattern2 = this.ytPattern2.exec(url);
		
		var videoId = (videoPattern1 !== null ? videoPattern1[1] : videoPattern2[1]);

		div.innerHTML = '<iframe width="'+this.ytVideoBlockWidth+'" height="'+this.ytVideoBlockHeight+'" src="https://www.youtube.com/embed/'+videoId+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		return div;
	},
	
	destroyVideoBlock: function() {
		if (this.ytVideoBlock !== null) {
			this.ytVideoBlock.parentNode.removeChild(this.ytVideoBlock);
			this.ytVideoBlock = null;
		}
	}
});