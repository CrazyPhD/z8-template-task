Z8.define('org.zenframework.z8.template.controls.MediaFileBox', {
	extend: 'Z8.form.field.File',
	audioPlayer: null,
	
	validate: function () {
		var content = this.getValue();
		
		if (!Z8.isEmpty(content)) {
			var name = content[0].name;
			var id = content[0].id;
			var url = content[0].path;
			
			if (this.isAudio(name)) {
				var filepath = encodeURI('/' + url.replace(/\\/g, '/')) + '?&session=' + Application.session +
					(id != null ? '&id=' + id : '');
				this.destroyAudioPlayer();
				this.audioPlayer = this.audioPlayerDom(name, filepath);
				var container = document.getElementsByClassName("audiotab")[0];
				container.appendChild(this.audioPlayer)
			} else {
				this.destroyAudioPlayer();	
			}
		} else {
			this.destroyAudioPlayer();
		}
	},
	
	isAudio: function(name) {
		return /.+\.(mp3|wav|ogg)$/.test(name); // TODO: add other audio formats if it's necessary.
	},
	
	
	audioPlayerDom: function(fn, url) {
		var audioBlock = document.createElement("div");
		
		var fileName = document.createElement("p");
		fileName.innerHTML = fn;
		
		var source = document.createElement("source");
		source.setAttribute("src", url);
		
		var audio = document.createElement("audio");
		audio.setAttribute("controls", "");
		audio.setAttribute("controlsList", "nodownload");
		audio.appendChild(source);
		
		audioBlock.appendChild(fileName);
		audioBlock.appendChild(audio);
		
		return audioBlock;
	},
	
	destroyAudioPlayer: function() {
		if (this.audioPlayer !== null) {
			this.audioPlayer.parentNode.removeChild(this.audioPlayer);
			this.audioPlayer = null;
		}	
	}
});