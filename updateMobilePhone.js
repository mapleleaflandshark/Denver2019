jQuery(document).ready(function(){
	try {
		var updateThis = jQuery("input[id$='___TollFree']");
		var baseUrl = JSON.parse(document.getElementById("__ClientContext").value).baseUrl;
		var id = JSON.parse(document.getElementById("__ClientContext").value).selectedPartyId;
		var token = document.getElementById("__RequestVerificationToken").value;
		jQuery(updateThis).blur(function(){
			try {
				var newMobile = updateThis.val();
				jQuery.ajax(baseUrl + "/api/party/" + id, {
					type: "GET",
					contentType: "application/json",
					headers: {
						RequestVerificationToken: token
					},
					success: function(data) {
						if (typeof data["Phones"] !== 'undefined') {
							var phones = data["Phones"]["$values"];
							var updatedPhones = {};
							var updatedValues = [];
							var mobileCheck = 0;
							for (i = 0; i < phones.length; i++) { 
								var p = phones[i];
								var updatedPhone = {};
								if (p["PhoneType"] == "Mobile") {
									mobileCheck = 1;
									updatedPhone["$type"] = "Asi.Soa.Membership.DataContracts.PhoneData, Asi.Contracts";
									updatedPhone["Number"] = newMobile;
									updatedPhone["PhoneType"] = p["PhoneType"];
								} else {
									updatedPhone["$type"] = "Asi.Soa.Membership.DataContracts.PhoneData, Asi.Contracts";
									updatedPhone["Number"] = p["Number"];
									updatedPhone["PhoneType"] = p["PhoneType"];
								}
								updatedValues.push(updatedPhone);
							}
							if (mobileCheck == 0) {
								var updatedPhone = {};
								updatedPhone["$type"] = "Asi.Soa.Membership.DataContracts.PhoneData, Asi.Contracts";
								updatedPhone["Number"] = newMobile;
								updatedPhone["PhoneType"] = "Mobile";
								console.log("ADDING NEW MOBILE PHONE");
							} else {
								console.log("UPDATING EXISTING MOBILE PHONE");
							}
							updatedValues.push(updatedPhone);
							data["Phones"]["$values"] = updatedValues;
							var updatedPhones = data;
						} else {
							var newPhone = '{"$type": "Asi.Soa.Membership.DataContracts.PhoneDataCollection, Asi.Contracts","$values": [{"$type": "Asi.Soa.Membership.DataContracts.PhoneData, Asi.Contracts","Number": "' + newMobile + '","PhoneType": "Mobile"}]}';
							data["Phones"] = JSON.parse(newPhone);
							var updatedPhones = data;
						}
						jQuery.ajax(baseUrl + "api/party/" + id, {
							type: "PUT",
							contentType: "application/json",
							headers: {
								RequestVerificationToken: token
							},
							data: JSON.stringify(updatedPhones),
							success: function(data) {
								console.log("UPDATING PHONES");
							}
						});
					}
				});
			} catch (inner) {
				console.log(inner);
			}
		});
	} catch (outer) {
		console.log(outer);
	}
});
