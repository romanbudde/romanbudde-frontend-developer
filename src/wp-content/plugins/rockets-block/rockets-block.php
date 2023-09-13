<?php

/**
 * Plugin Name:       Rockets Block
 * Description:       Custom React JS block that communicates with SpaceX API and renders a filterable dynamic grid of rockets.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rockets-block
 * Domain path:       /languages
 *
 * @package create-block
 */
class Rockets
{
	function __construct()
	{
		add_action('init', array($this, 'register_spacex_rockets_endpoint'));
		add_action('init', array($this, 'create_block_rockets_block_block_init'));
		add_action('init', array($this, 'languages'));
	}

	function languages()
	{
		load_plugin_textdomain('rockets-block', false, dirname(plugin_basename(__FILE__)) . '/languages');
	}

	function create_block_rockets_block_block_init()
	{
		register_block_type(
			__DIR__ . '/build',
			array(
				'render_callback' => array($this, 'create_block_rocket_render_callback'),
			)
		);
	}


	function create_block_rocket_render_callback()
	{
		wp_enqueue_script('create-block-rockets-block-view-script');

		ob_start();
		require plugin_dir_path(__FILE__) . 'src/template.php';
		return ob_get_clean();
	}

	function register_spacex_rockets_endpoint()
	{
		register_rest_route('custom-plugin/v1', '/spacex-rockets', array(
			'methods' => 'GET',
			'callback' => array($this, 'fetch_spacex_rockets_data'),
			'permission_callback' => 'is_user_logged_in'
		));
	}

	function fetch_spacex_rockets_data()
	{
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
}

$rockets = new Rockets();
