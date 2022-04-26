<?php

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Handles settings retrieval from the settings API.
 */
class WC_Vite_Gateway_Settings
{

	/**
	 * Setting values from get_option.
	 *
	 * @var array
	 */
	protected $_settings = array();


	/**
	 * Flag to indicate setting has been loaded from DB.
	 *
	 * @var bool
	 */
	private $_is_setting_loaded = false;


	public function __set($key, $value)
	{
		if (array_key_exists($key, $this->_settings)) {
			$this->_settings[$key] = $value;
		}
	}


	public function __get($key)
	{
		if (array_key_exists($key, $this->_settings)) {
			return $this->_settings[$key];
		}
		return null;
	}


	public function __isset($key)
	{
		return array_key_exists($key, $this->_settings);
	}


	public function __construct()
	{
		$this->load();
	}


	/**
	 * Load settings from DB.
	 *
	 * @param bool $force_reload Force reload settings
	 *
	 * @return WC_Vite_Gateway_Settings Instance of WC_Vite_Gateway_Settings
	 */
	public function load($force_reload = false)
	{
		if ($this->_is_setting_loaded && !$force_reload) {
			return $this;
		}
		$this->_settings            = (array) get_option('vite_payments_for_woocommerce_settings', array());
		$this->_is_setting_loaded   = true;
		return $this;
	}


	/**
	 * Save current settings.
	 *
	 */
	public function save()
	{
		update_option('vite_payments_for_woocommerce_settings', $this->_settings);
	}


	/**
	 * Is VPFW enabled.
	 *
	 * @return bool
	 */
	public function is_enabled()
	{
		return 'yes' === $this->enabled;
	}
}
