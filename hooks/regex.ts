/**
 * Regexes used for validation in the form's.
 */
 const Regexes = {
    /* Regex for Longitude and Latitude. */
    longLatRegex: new RegExp('^(-?d+(.d+)?),s*(-?d+(.d+)?)$'),
  
    /* Regex for Albhabets. */
    onlyAplhabets: /^[A-Za-z]+$/,
  
    onlyNumbers: /^[0-9]+$/,
    
  
    /* Regex for WhatsApp. */
    whatsappRegex: new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/),
    whatsappNumericRegex: new RegExp('^[0-9-+]+$'),
  
    /* Regex for Email Id */
    emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  
    /* Regex for Mobile Number */
    mobileRegex: new RegExp('^[0-9-+]+$'),
  
    /* Regex for Town and Pincode url */
    townAndPinRegex: new RegExp('^[a-zA-Z0-9 ]+$'),
  
    /* Regex for Youtube url */
    youtubeRegex: new RegExp(
      /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,
    ),
  
    /* Regex for Url */
    urlRegex: new RegExp(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    ),
  
    /* Regex for Facebbok url */
    facebookRegex: new RegExp(
      '(?:(?:http|https)://)?(?:www.)?facebook.com/(?:(?:w)*#!/)?(?:pages/)?(?:[?w-]*/)?(?:profile.php?id=(?=d.*))?([w-]*)?',
    ),
    /* Regex for Twitter url */
    twitterRegex: new RegExp(
      /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
    ),
  
    /* Regex for Instagram url */
    instagramRegex: new RegExp(
      // /^\s*(http\:\/\/)?instagram\.com\/[a-z\d-_]{1,255}\s*$/i,
      /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im,
    ),
  
    /* Regex for Linkedin url */
    linkedinRegex: new RegExp('^https:\\/\\/[a-z]{2,3}\\.linkedin\\.com\\/.*$'),
  
    latitudeRegex: new RegExp('^[0-9-.]+$'),
  
    /* Regex for Wikipedia url */
    wikipediaRegex: new RegExp('^https:\\/\\/[a-z]{2,3}\\.wikipedia\\.org\\/.*$'),
  };
  
  export default Regexes;
  