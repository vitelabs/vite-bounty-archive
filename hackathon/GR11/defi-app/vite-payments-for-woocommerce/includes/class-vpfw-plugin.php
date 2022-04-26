<?php

/**
 * Vite Payments for Woocommerce Plugin Class
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

class WC_Vite_Gateway_Plugin
{

	/**
	 * Instance of WC_Vite_Gateway_Settings.
	 *
	 * @var WC_Vite_Gateway_Settings
	 */
	public $settings;
	public $onPaymentSuccess = 'vite-payment-success';
	public $onPaymentFailure = 'vite-payment-failure';

	/**
	 * Constructor.
	 *
	 * @param string $file Filepath of main plugin file
	 * @param string $version Plugin version
	 */
	public function __construct($file, $version)
	{
		$this->file    = $file;
		$this->version = $version;
	}

	/**
	 * Run the plugin.
	 */
	public function _run()
	{
		register_activation_hook($this->file, array($this, 'activate'));
		$this->_load_handlers();
	}

	/**
	 * Handle updates.
	 *
	 * @param string $new_version The plugin's new version.
	 */
	private function run_updater($new_version)
	{
		// Map old settings to settings API
		if (get_option('enabled'))
        {
			$settings_array            = (array) get_option('vite_payments_for_woocommerce_settings', array());
			$settings_array['enabled'] = get_option('enabled') ? 'yes' : 'no';

			update_option('vite_payments_for_woocommerce_settings', $settings_array);
			delete_option('enabled');
		}
	}


	/**
	 * Callback for activation hook.
	 */
	public function activate()
	{
		if (!isset($this->settings))
        {
			require_once VPFW_DIR . 'includes/settings/class-vpfw-settings.php';
			$settings = new WC_Vite_Gateway_Settings();
		}
        else
        {
			$settings = $this->settings;
		}
	}

	/**
	 * Load handlers.
	 */
	protected function _load_handlers()
	{

		// Load handlers.
		require_once VPFW_DIR . 'includes/class-vpfw-settings.php';

		$this->settings       = new WC_Vite_Gateway_Settings();
	}


	/**
	 * Generate random password if one isn't input by admin 
	 *
	 * @return string
	 */
    function genRandPa()
    {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); 
        $alphaLength = strlen($alphabet) - 1;

        for ($i = 0; $i < 8; $i++)
        {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }

        return implode($pass); //turn the array into a string
    }

    /**
     * Encrypt data from given cipher using given key
     *
     * @param mixed $string_to_encrypt
     * @param mixed $encryption_key
     * @param mixed $ciphering
     * @param mixed $options
     * @return mixed
     */
    public function encrypt_string($string_to_encrypt, $encryption_key, $ciphering = "AES-128-CTR", $options = 0)
    {    
        // Non-NULL Initialization Vector for encryption
        // $iv_length = openssl_cipher_iv_length($ciphering);
        $encryption_iv = '1234567891011121';
        
        // Using openssl_encrypt() function to encrypt the data 
        return openssl_encrypt($string_to_encrypt, $ciphering, $encryption_key, $options, $encryption_iv);
    }


    /**
     * Decrypt data from given cipher using given key
     *
     * @param mixed $string_to_decrypt
     * @param mixed $encryption_key
     * @param mixed $ciphering
     * @param mixed $options
     * @return mixed
     */
    public function decrypt_string($string_to_decrypt, $decryption_key, $ciphering = "AES-128-CTR", $options = 0)
    {
        // Non-NULL Initialization Vector for decryption
        // $iv_length = openssl_cipher_iv_length($ciphering);
        $decryption_iv = '1234567891011121';
        
        // Using openssl_decrypt() function to decrypt the data 
        return openssl_decrypt($string_to_decrypt, $ciphering, $decryption_key, $options, '1234567891011121');
    }
    

    /**
     * Encrypt value to a cryptojs compatiable json encoding string
     * ex. $encrypted = cryptoJsAesEncrypt("passphrase", $stringToEncrypt);
     * 
     * @param mixed $passphrase
     * @param mixed $value
     * @return string
     */
    function cryptoJsAesEncrypt($passphrase, $value)
    {
        $salt = openssl_random_pseudo_bytes(8);
        $salted = '';
        $dx = '';

        while (strlen($salted) < 48)
        {
            $dx = md5($dx.$passphrase.$salt, true);
            $salted .= $dx;
        }

        $key = substr($salted, 0, 32);
        $iv  = substr($salted, 32,16);
        $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
        $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
        return json_encode($data);
    }


    /**
     * Decrypt data from a CryptoJS json encoding string
     * ex. $decrypted = cryptoJsAesDecrypt("passphrase", $stringToDecrypt);
     *
     * @param mixed $passphrase
     * @param mixed $jsonString
     * @return mixed
     */
    function cryptoJsAesDecrypt($passphrase, $jsonString)
    {
        $jsondata = json_decode($jsonString, true);
        $salt = hex2bin($jsondata["s"]);
        $ct = base64_decode($jsondata["ct"]);
        $iv  = hex2bin($jsondata["iv"]);
        $concatedPassphrase = $passphrase.$salt;
        $md5 = array();
        $md5[0] = md5($concatedPassphrase, true);
        $result = $md5[0];

        for ($i = 1; $i < 3; $i++)
        {
            $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
            $result .= $md5[$i];
        }

        $key = substr($result, 0, 32);
        $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);

        return json_decode($data, true);
    }


} // End of WC_Vite_Gateway_Settings class
