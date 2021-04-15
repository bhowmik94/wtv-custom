$(document).ready(function () {
    var md = new MobileDetect(window.navigator.userAgent);
    if(md.mobile()){
        $('body').addClass('mobile-device-wrapper')
        if(md.phone()){
            $('body').addClass('phone-device-wrapper')
        }

        if(md.tablet()){
            $('body').addClass('tablet-device-wrapper')
        }
    }
});