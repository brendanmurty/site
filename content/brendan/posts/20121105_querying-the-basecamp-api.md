---
title: Querying the Basecamp 2 API
date: 2012-11-05
---

After using [Basecamp 2](http://basecamp.com/2) for some time on my [Windows Phone](http://windowsphone.com/), I decided to build a third-party web based mobile client to improve the system for mobile devices. This became [UpcomingTasks](http://upcomingtasks.com/).</p>

One of the most basic requirements of the web client was that it needed to query the [Basecamp API](https://github.com/37signals/bcx-api) and return the results for display. Here's my *bc_results* PHP function that got the job done:

	<?
	// bc_results
	// Purpose: Query the Basecamp API and return the result as an array
	// Notes: More information about the Basecamp API can be found at https://github.com/37signals/bcx-api/
	// Example: <?php print_r(bc_results('/people/me.json','99999999','dhjfksdhfjksdhfij32')); ?>
	function bc_results($api_url,$bc_account_id,$bc_user_token){
		if($api_url){
			$api_url='https://basecamp.com/'.$bc_account_id.'/api/v1'.$api_url;
			$ch=curl_init();
			$options=array(
				CURLOPT_URL => $api_url,
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_HTTPHEADER => array('Content-type: application/json','Authorization: Bearer '.$bc_user_token),
				CURLOPT_USERAGENT => 'SampleAppName (test@testington.com)'
			);
			curl_setopt_array($ch,$options);
			return json_decode(curl_exec($ch),'true');
		}
	}
	?>