 const {Cc,Ci} = require("chrome");

var dock = Cc["@mozilla.org/widget/macdocksupport;1"]
		.getService(Ci.nsIMacDockSupport);

var profile = Cc["@mozilla.org/toolkit/profile-service;1"]
              .getService(Ci.nsIToolkitProfileService);
dock.badgeText = profile.selectedProfile;
