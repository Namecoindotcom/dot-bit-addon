// JavaScript Document

function FindProxyForURL(url, host) {
        if (shExpMatch(url, "*.bit/*"))
        {
	      return "Your proxy server URL";

        }
       else{
        return "DIRECT";
        }
}
