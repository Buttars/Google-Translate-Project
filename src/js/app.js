$(document).ready(function () {
  /**
   * Just show an alert for some example JS
   */

  $('.test-button').click(function () {
    alert('Whey hey!');
    return false;
  });

  $(function () {
    $('[data-toggle="popover"]').popover()
  })

  var key = "AIzaSyCrZ3d82w_Xhry-6YwOb1J-pdRnZxFubYA";
  var dest = "https://translation.googleapis.com/language/translate/v2?key=" + key;

  function queryTranslate(text, source, target, callback) {
    var message = {
      'q': text,
      'source': source,
      'target': target,
      'format': 'text'
    }
    $.ajaxSetup({ async: false });
    $.post(dest, message, function (msg) {
      callback(msg.data.translations[0].translatedText);
    });
  }

  $('.translate-submit').click(function () {
    document.getElementById('translation-list').innerHTML = "";
    document.getElementById('translation-list-reversed').innerHTML = "";
    var txt = [];
    var txtreversed = [];
    var input = document.getElementById("translate-input").value;
    var source = "en";
    var sourcename = "English";
    var lang = {
      "name": [
        "Afrikaans",
        "Albanian",
        "Amharic",
        "Arabic",
        "Armenian",
        "Azeerbaijani",
        "Basque",
        "Belarusian",
        "Bengali",
        "Bosnian",
        "Bulgarian",
        "Catalan",
        "Cebuano",
        "Chinese",
        "Chinese",
        "Corsican",
        "Croatian",
        "Czech",
        "Danish",
        "Dutch",
        "English",
        "Esperanto",
        "Estonian",
        "Finnish",
        "French",
        "Frisian",
        "Galician",
        "Georgian",
        "German",
        "Greek",
        "Gujarati",
        "Haitian",
        "Hausa",
        "Hawaiian",
        "Hebrew",
        "Hindi",
        "Hmong",
        "Hungarian",
        "Icelandic",
        "Igbo",
        "Indonesian",
        "Irish",
        "Italian",
        "Japanese",
        "Javanese",
        "Kannada",
        "Kazakh",
        "Khmer",
        "Korean",
        "Kurdish",
        "Kyrgyz",
        "Lao",
        "Latin",
        "Latvian",
        "Lithuanian",
        "Luxembourgish",
        "Macedonian",
        "Malagasy",
        "Malay",
        "Malayalam",
        "Maltese",
        "Maori",
        "Marathi",
        "Mongolian",
        "Myanmar",
        "Nepali",
        "Norwegian",
        "Nyanja",
        "Pashto",
        "Persian",
        "Polish",
        "Portuguese",
        "Punjabi",
        "Romanian",
        "Russian",
        "Samoan",
        "Scots",
        "Serbian",
        "Sesotho",
        "Shona",
        "Sindhi",
        "Sinhala",
        "Slovak",
        "Slovenian",
        "Somali",
        "Spanish",
        "Sundanese",
        "Swahili",
        "Swedish",
        "Tagalog",
        "Tajik",
        "Tamil",
        "Telugu",
        "Thai",
        "Turkish",
        "Ukrainian",
        "Urdu",
        "Uzbek",
        "Vietnamese",
        "Welsh",
        "Xhosa",
        "Yiddish",
        "Yoruba",
        "Zulu"
      ],
      "code": [
        "af",
        "sq",
        "am",
        "ar",
        "hy",
        "az",
        "eu",
        "be",
        "bn",
        "bs",
        "bg",
        "ca",
        "ceb",
        "zh-CN",
        "zh-TW",
        "co",
        "hr",
        "cs",
        "da",
        "nl",
        "en",
        "eo",
        "et",
        "fi",
        "fr",
        "fy",
        "gl",
        "ka",
        "de",
        "el",
        "gu",
        "ht",
        "ha",
        "haw",
        "iw",
        "hi",
        "hmn",
        "hu",
        "is",
        "ig",
        "id",
        "ga",
        "it",
        "ja",
        "jw",
        "kn",
        "kk",
        "km",
        "ko",
        "ku",
        "ky",
        "lo",
        "la",
        "lv",
        "lt",
        "lb",
        "mk",
        "mg",
        "ms",
        "ml",
        "mt",
        "mi",
        "mr",
        "mn",
        "my",
        "ne",
        "no",
        "ny",
        "ps",
        "fa",
        "pl",
        "pt",
        "pa",
        "ro",
        "ru",
        "sm",
        "gd",
        "sr",
        "st",
        "sn",
        "sd",
        "si",
        "sk",
        "sl",
        "so",
        "es",
        "su",
        "sw",
        "sv",
        "tl",
        "tg",
        "ta",
        "te",
        "th",
        "tr",
        "uk",
        "ur",
        "uz",
        "vi",
        "cy",
        "xh",
        "yi",
        "yo",
        "zu"
      ]
    }

    lang.code.splice(lang.code.indexOf(source), 1);
    lang.code.unshift(source);

    lang.name.splice(lang.name.indexOf(sourcename), 1);
    lang.name.unshift(sourcename);

    txt.unshift(input);

    for (var i = 0; i < lang.code.length - 1; i++) {
      queryTranslate(txt[i], lang.code[i], lang.code[i + 1],
        function (response) {
          $.ajaxSetup({ async: true });
          txt.push(response);
          document.getElementById('translation-list').innerHTML += "<li class=\"list-group-item\">" + lang.name[i + 1] + ": " + response + "</li>";
        });
    }

    for (var i = lang.code.length - 1; i > 0; i--) {
      queryTranslate(txt[i], lang.code[i], lang.code[i - 1],
        function (response) {
          $.ajaxSetup({ async: true });
          txtreversed.push(response);
          document.getElementById('translation-list-reversed').innerHTML += "<li class=\"list-group-item\">" + lang.name[i - 1] + ": " + response + "</li>";
        });
    }

    document.getElementById('translate-output').value = txtreversed[txtreversed.length - 1]; // Set translate-output to the reversed output

  });
});
