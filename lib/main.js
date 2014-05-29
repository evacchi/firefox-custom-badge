 const {Cc,Ci} = require("chrome");


var prefs = Cc["@mozilla.org/preferences-service;1"]
              .getService(Ci.nsIPrefBranch);

//var myPrefs = prefs.getBranch("extensions.custom-badge.");
//myPrefs.addObserver("extensions.custom-badge.", );

var myPrefObserver = {
  dock:  Cc["@mozilla.org/widget/macdocksupport;1"]
		.getService(Ci.nsIMacDockSupport),

  prefService: null,	
  register: function() {
    this.prefService = Cc["@mozilla.org/preferences-service;1"]
                                .getService(Ci.nsIPrefService);
    

    this.branch = this.prefService.getBranch("extensions.custom-badge.");
    if (this.branch.prefHasUserValue("value")) {
		this.dock.badgeText = this.branch.getCharPref("value");
	}
    this.branch.addObserver("", this, false);
  },

  unregister: function() {
    this.branch.removeObserver("", this);
  },

  observe: function(aSubject, aTopic, aData) {
    // aSubject is the nsIPrefBranch we're observing (after appropriate QI)
    // aData is the name of the pref that's been changed (relative to aSubject)
    switch (aData) {
      case "value":
        this.dock.badgeText = this.branch.getCharPref("value");
        break;
    }
  }
}
myPrefObserver.register();
