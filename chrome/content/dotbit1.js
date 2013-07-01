 var oldProxy='';

var dotbit =
{
    'statusBarIcon': null,
    'preferences': null,
'init': function () {
           dotbit.preferences = Components
				.classes["@mozilla.org/preferences-service;1"].getService(
				Components.interfaces.nsIPrefService);
        dotbit.preferences = dotbit.preferences.getBranch('extensions.dotbit.');
        try {
            var status = dotbit.preferences.getCharPref('status');
        }
        catch (err) {
            var status = 'inactive';
            dotbit.preferences.setCharPref('status', status);
        }

        //	Icon
        dotbit.statusBarIcon = document.getElementById('dotbitStatusBarIcon');
        dotbit.statusBarIcon.addEventListener('click',
				dotbit.toggleStatusBarIcon, false);
        dotbit.statusBarIcon.setAttribute('value', status);

        if ('active' == status) {
            gBrowser.getBrowserForTab(gBrowser.selectedTab).addEventListener(
				'DOMContentLoaded',
				dotbit.fixCurrentTab,
				true
			);
        }
    },

    'toggleStatusBarIcon': function () {
     

        var wm = Components.classes['@mozilla.org/appshell/window-mediator;1']
				.getService(Components.interfaces.nsIWindowMediator);

        var windowIter = wm.getEnumerator('navigator:browser');

        var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefBranch);

           if ('active' == dotbit.statusBarIcon.getAttribute('value')) {
            var newStatus = 'inactive';
            var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                               .getService(Components.interfaces.nsIPrefBranch);
          	prefManager.setIntPref("network.proxy.type",prefManager.getIntPref("network.oldProxy.type"));
		prefManager.setCharPref("network.proxy.autoconfig_url",prefManager.getCharPref("network.oldProxy.autoconfig_url"));
          alert("your proxy setting have been saved successfully");
         
        }
        else {
            var newStatus = 'active';
          
            var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefBranch);
	 if(prefManager.getCharPref("network.proxy.autoconfig_url")!="<YOUR PAC FILE URL>")
	  {
  prefManager.setCharPref("network.oldProxy.autoconfig_url",prefManager.getCharPref("network.proxy.autoconfig_url"));	
	  prefManager.setIntPref("network.oldProxy.type",prefManager.getIntPref("network.proxy.type"));
  	   
	  }
 prefManager.setIntPref("network.proxy.type",2);

            //setting pac file url 
            prefManager.setCharPref("network.proxy.autoconfig_url","<YOUR PAC FILE URL>");
            alert("your proxy setting have been saved successfully");
        }
        var currentWindow;
        while (windowIter.hasMoreElements()) {
            currentWindow = windowIter.getNext();
            currentWindow.dotbit.statusBarIcon.setAttribute('value', newStatus);
            currentWindow.dotbit.preferences.setCharPref('status', newStatus);
        }
    }
}
window.addEventListener('load', dotbit.init, false);
