<?php
/*
Plugin Name: My plugin
Plugin URI: https://akismet.com/
Description: Used by millions, Akismet is quite possibly the best way in the world to <strong>protect your blog from spam</strong>. Akismet anti spam keeps your site protected even while you sleep. To get started: activate the Akismet plugin and then go to your Akismet Settings page to set up your API key.
Version: 1.0.0
Author: Roman Budde
Author URI: https://www.linkedin.com/in/roman-budde-649923211/
License: GPLv2 or later
*/

if( ! defined( 'ABSPATH' ) ) exit;

class CustomPlugin {
	function __construct() {
		add_action('init', array($this, 'languages'));
		add_action('enqueue_block_editor_assets', array($this, 'adminAssets'), 10);
		add_action('init', array($this, 'register_spacex_rockets_endpoint'));
	}
	
	function languages() {
		load_plugin_textdomain('mytranslationsdomain', false, dirname(plugin_basename(__FILE__)) . '/languages');
	}

	function register_spacex_rockets_endpoint() {
		register_rest_route('custom-plugin/v1', '/spacex-rockets', array(
			'methods' => 'GET',
			'callback' => array($this, 'fetch_spacex_rockets_data')
			// 'permission_callback' => 'is_user_logged_in',
		));
	}

	function fetch_spacex_rockets_data() {
		$curl = curl_init();

		curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://api.spacexdata.com/v4/rockets',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'GET',
		));

		$response = curl_exec($curl);

		curl_close($curl);
		$data = json_decode($response);

		return wp_send_json($data);
	}

	function adminAssets() {
		wp_enqueue_script('mynewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element'));
	}
}

$customPlugin = new CustomPlugin();
