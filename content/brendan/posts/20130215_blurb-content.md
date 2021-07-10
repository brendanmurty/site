---
title: Blurb content
date: 2013-02-15
---

Need to shorten some content so it fits in a small area? My *blurb* function will shorten any content to the given number of characters.

	<?php
	function blurb($content,$length){
		$content_length=strlen($content);
		if($content_length>=$length){// Too long, return the shortened string
			return mb_substr($content,0,$length-3).'...';
		}else{// All good, return the string unchanged
			return $content;
		}
	}
	?>