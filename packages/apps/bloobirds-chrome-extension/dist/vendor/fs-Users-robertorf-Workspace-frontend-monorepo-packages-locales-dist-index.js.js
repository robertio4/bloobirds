var userSettingsWebapp$1 = {
	title: "Personal settings",
	documentTitle: "User Settings",
	tabs: {
		general: "General",
		email: "Email",
		calls: "Calls",
		linkedin_extension: "Chrome App",
		meetings: "Meetings",
		cadence: "Cadence",
		security: "Security",
		connections: "Email",
		reminders: "Tasks and Reminders",
		whatsapp: "Whatsapp"
	},
	personalDetails: {
		title: "Personal details",
		name: "Name",
		shortname: "Shortname",
		color: "Color",
		timezone: {
			title: "Time Zone",
			placeholder: "Time Zone"
		},
		email: {
			title: "Change login email",
			subtitle: "Your email address is currently <strong>{{email}}</strong>",
			placeholder: "New email address",
			validation: "Must be a valid email",
			verification: " We've sent a verification email to the new email. Once it is verified it will be set as as your email."
		},
		language: {
			title: "Change Language",
			subtitle: "Your current language is set to <strong>{{language}}</strong>"
		},
		save: "Save changes",
		toasts: {
			success: "Your settings have been updated!",
			error: "There was an error saving your personal settings!"
		}
	},
	callSettings: {
		title: "Dialer by default",
		disabledMessage: "Your user does not have an {{dialerName}} user mapped, ask your admin to assign one!",
		bloobirdsDialer: {
			phoneText: "Your connected private phone numbers",
			addPhone: "Add phone",
			noPhoneNumbers: "You don't have connected phone numbers",
			incomingCalls: "How do you want to receive incoming calls?",
			byWebDialer: "By web dialer",
			item: "By phone call ({{phone}})",
			tooltip: "A private phone number is the number of your mobile device. When making calls with Bloobirds, we will call this number to connect you with the lead's number. Never your private number will be shown to the lead. Instead they will see the Bloobirds number assigned to your account."
		},
		aircallDialer: {
			checkbox: "Sync your contacts from Bloobirds to {{dialer}}"
		},
		manualCalls: {
			title: "Do you want to be able to log calls manually from the dialer?",
			checkbox: "Enable call log view manually"
		},
		dialerView: {
			title: "Select the dialer default view",
			webDialer: "Call by web dialer",
			logCall: "Log calls manually"
		},
		matchingLead: {
			title: "Automatically change the user’s phone to one that matches the lead’s phone extension if available",
			checkbox: "Auto-change phone extension"
		},
		viewOnCall: {
			title: " Select the view you want to see when making a call",
			pitches: "Pitches in Messaging",
			activityFeed: "Activity feed"
		},
		saveChanges: "saveChanges",
		addPhoneModal: {
			title: "Add your phone number",
			addPhoneStep: {
				title: "Enter your phone number",
				missingPrefix: "Prefix number cannot be empty",
				invalidPrefix: "Invalid prefix number",
				countryPlaceholder: "Country",
				phoneEmpty: "Phone number cannot be empty",
				invalidPhone: "Invalid phone number",
				phoneUsed: "Phone number was already used",
				callout: "<strong> Make sure to deactivate your voicemail.</strong> Outgoing calls will connect to your phone first before connecting to leads. If you have voice mail activate, the system could mistake this with you answering the call, and unwantedly continue connecting to the lead.",
				cancel: "Cancel",
				save: "Save"
			},
			defaultPhoneStep: {
				title: "{{phone}} has been added!",
				list: {
					"1": "You can now use this phone number to call leads",
					"2": "You can now call to (50) different countries",
					"3": "This number will never be shown to your leads - Your Lovebirds number is shown instead"
				},
				checkbox: "Set this phone number as my default selected option for calls",
				done: "Done"
			}
		},
		toasts: {
			incoming: "Incoming calls method updated",
			dialerDefault: "Dialer default value updated"
		}
	},
	disconnectModal: {
		title: "Confirm disconnecting {{nameType}}",
		email: "email",
		phoneNumber: "phone number",
		content: "Are you sure you wish to disconnect {{connection}}?",
		checkbox: "Yes, disconnect {{connection}} from my private {{nameType}}s",
		callout: "You will <strong>no longer be able to do calls with this number</strong>. In order to use it again later you will have to do redo the phone verification.",
		cancel: "Cancel",
		confirm: "Confirm"
	},
	addAliasModal: {
		toasts: {
			success: "Alias created successfully!",
			error: "There was an error creating alias, please try again later."
		},
		title: "Add email alias",
		contentHeader: "Enter a new email alias for the account ",
		content: "⚠️ Be aware that you need to set up your aliases properly if you’re using a <0>Gmail</0> or <1>Outlook</1> account.",
		validation: "This is not a valid email",
		footer: "This email address will a new alias linked with your account.",
		cancel: "Cancel",
		confirm: "Confirm"
	},
	changeSignatureModal: {
		title: "Change Signature",
		placeholder: "Select a signature",
		cancel: "Cancel",
		save: "Save"
	},
	chromeAppSettings: {
		title: "<0>Bloobirds Capture plugin</0> helps you prospect <0>10x faster! 🚀</0>",
		subtitle: "  Research your prospects on LinkedIn and save them right into Bloobirds - with just a single click!",
		link: "You can download the latest version here.",
		knowledge: "For easy instructions on how to install and use the Bloobirds Capture plugin please see our <0>knowledge base.</0>"
	},
	whatsappSettings: {
		title: "Enable auto-sync chats",
		subtitle: "Automatically sync a prospect's chat when accessing if from WhatsApp web as long as it is saved in the database.",
		checkbox: "Enable auto-sync of WhatsApp chats",
		disableText: "This function is enabled by default by an account admin. If you want to disable it, please talk to your supervisor.",
		toasts: {
			success: "Your settings have been updated!",
			error: "There was an error saving your personal settings!"
		}
	},
	meetingSettings: {
		title: "My meeting links",
		addLink: "+ Add link",
		noMeetings: "No meeting links created!",
		noMeetingsSubtitle: "Select the time of the day when you’re available for your meetings and create a link to send your clients to book meetings 📅",
		meetingEntityCard: {
			setDefault: "Set as default",
			edit: "Edit"
		},
		deleteMeetingLink: "You’re about to delete a Meeting Link. The following action cannot be undone. Do you wish to continue?",
		createEditMeetingModal: {
			createTitle: "Create new Meeting Link",
			editTitle: "Edit new Meeting Link",
			title: "Choose when your meetings can be booked 📅",
			subtitle: "Set a title and link an external schedule, so your clients will know exactly when you can schedule a meeting with them.",
			titlePlaceholder: "Title *",
			meetingLinkPlaceholder: "Meeting Link *",
			cancel: "Cancel",
			"delete": "Delete",
			setAsDefault: "Set as default",
			saveChanges: "'Save changes",
			create: "Create",
			validation: "The url format is not valid"
		}
	},
	cadenceSettings: {
		title: "Active pauses",
		pauseCadence: "Pause Cadence",
		calloutTitle: "This process may take time to finish! Your tasks are being rescheduled...",
		calloutSubtitle: "Wait a few minutes before trying to pause it again!",
		noCadenceTitle: "No active pauses so far!",
		noCadenceSubtitle: "Going on holiday for a few days? 🌴 Pause your cadences for the days you&apos;ll be out. You can resume them when you're back!",
		showPast: "SHOW PAST PAUSES",
		hidePast: "HIDE PAST PAUSES",
		pauseCadenceCard: {
			edit: "Edit",
			cancel: "Cancel",
			sure: "Sure?",
			date: "From {{fromDate}} to {{toDate}} "
		},
		pauseCadenceModal: {
			title: "Schedule pause timeframe",
			mainText: "Choose when to pause your cadences",
			subMainText: "Pick the days you won't be available. New cadences will take into account your pauses and existing cadences will skip these days,",
			pausePlaceholder: "Pause name*",
			startDateValidation: "Start date must be future",
			startDatePlaceholder: "From*",
			endDateValidation: "End date must be higher than start date",
			endDatePlaceholder: "To*",
			cancel: "Cancel",
			updatePause: "Update pause",
			schedulePause: "Schedule pause",
			mandatoryError: "This is a mandatory field"
		}
	},
	reminderSettings: {
		toasts: {
			success: "Your reminder settings have been updated!",
			error: "There was an error saving your reminder settings!",
			example: {
				title: "This is a test task due in {{minutes}} minutes",
				subtitle: "Example Company Inc."
			}
		},
		autoCompletion: {
			title: "Auto completion of tasks",
			checkbox: "Auto complete your Cadence and Scheduled tasks when doing an attempt."
		},
		autoLogActivity: {
			title: "Auto-log custom activity",
			checkbox: "Auto-log custom activity when completing a custom task."
		},
		taskReminder: {
			title: "Task reminder",
			checkbox: "Get notified with a pop-up toast prior to the scheduled task time",
			reminderTimeText: "How long in advance of the scheduled time do you want to be notified?",
			options: {
				"1": "1 minute",
				"5": "5 minutes",
				"10": "10 minutes",
				"20": "20 minutes",
				"30": "30 minutes",
				"60": "1 hour",
				"120": "2 hours"
			},
			playSoundText: "Play a sound when you receive a new notification",
			test: "Test"
		},
		saveChanges: "Save changes"
	},
	passwordSettings: {
		toasts: {
			success: "Your password has been updated!",
			error: "Your password is not correct!"
		},
		title: "Change your password",
		pwdPlaceholder: "Current Password",
		newPwdPlaceholder: "New Password",
		rule1: "At least 8 characters",
		rule2: "One uppercase character",
		rule3: "One lowercase character",
		rule4: "One number or special symbol",
		reset: "Reset Password"
	}
};
var accountSettings$1 = {
	taskFeed: {
		subtitle: "These defaults will b  e applied to the entire account.",
		title: "Task feed for {{accountName}}"
	},
	crmStatus: {
		chooseSalesforceField: "Choose a Salesforce Field if you want to use them on your reporting.",
		confirmContinue: "Are you sure you want to continue?",
		confirmDeleteField: "You’re removing the Salesforce Field used to determine the statuses. You’ll lose the relationships you’ve established. This action cannot be undone.",
		confirmEditField: "You’re about to change the Salesforce Field used to determine the statuses. You’ll lose the relationships you’ve established. This action cannot be undone.",
		goBackButton: "Go Back",
		infoStatus: {
			active: "<strong>Active:</strong> Keep planning your next steps in an active sales relationship.",
			inactive: "<strong>Inactive: </strong>No active sales process, and no next-step reminders.",
			lost: "<strong>Lost: </strong> When a sales opportunity with the contact is lost.",
			nurturing: "<strong>Nurturing:</strong> Maintain interaction, but with a longer sales timeline.",
			won: "<strong>Won: </strong> When you've secured a sales opportunity with the contact."
		},
		modalSelectField: "Please, select the <strong>Salesforce Status field</strong> to map with the Bloobirds status system",
		modalSelectSearch: "Search...",
		noSalesforceFieldSelected: "No Salesforce Field selected",
		noStatusSelected: "No status field selected",
		removeRelationButton: "Remove relation",
		resync: "Resync",
		salesforceStatusField: "Salesforce status field: ",
		saveButton: "Save",
		selectSalesforceField: "Select Salesforce field",
		selectStatus: "Select status",
		subtitle: "<strong>Organise your Salesforce statuses</strong> according to the current stage of your relationship with each contact. Categorising your statuses in Bloobirds will help <strong>add intelligence</strong> to your tasks, <strong>organise</strong> your pipeline, trim inactive companies, and much more.",
		tabTitle: "{{crmObject}} Status Relationships",
		title: "Statuses On Top Of Salesforce",
		updateFieldFailed: "There was an error updating Salesforce Status field.",
		updateFieldSuccess: "Salesforce Status field updated successfully!"
	},
	dialers: {
		aircall: {
			active: "active",
			aircallAccount: "Aircall account",
			aircallBloobirdsProduction: "Bloobirds production",
			aircallBloobirdsUser: "Bloobirds User",
			aircallConnectInfo: "Connecting your Aircall will allow you to call in Bloobirds by the Aircall dialer and synchronise the phone activity with your Bloobirds data.",
			aircallDashboard: "Aircall dashboard",
			aircallNotConnected: "Aircall is not connected",
			aircallNumbersNotAdded: "You have {{numbersNotInIntegration}} {{numbersCounter}} not added in the integration. Remember to add all your numbers on the integration to avoid the calls not being registered on Bloobirds. To add more numbers, go to your ",
			aircallNumbersNotAddedPost: ". This can also be added in integration success email or similar push",
			aircallSyncContacts: "Sync contacts from Bloobirds",
			aircallUserEmail: "Aircall User Email",
			aircallUserName: "Aircall User Name",
			aircallUsers: "Aircall Users",
			aircallUsersTooltip: "Aircall users are automatically synced each time they are deleted or created. If you are not seeing some of them, you can try to refresh them!",
			confirmConnectAircall: "Do you wish to connect your Aircall account?",
			connectAircall: "Connect Aircall",
			connectedNumbers: "Connected numbers ",
			inactive: "inactive",
			integrationCurrentState: "Your integration is currently",
			matchAircallUsers: "Match your Bloobirds Users with the Aircall users to match calls between systems.",
			number_one: "number",
			number_others: "numbers",
			phoneAddedIntegration: "Phone added to the integration",
			phoneName: "Phone name",
			phoneNumber_one: "Phone number",
			recordingEnabled: "Recording enabled",
			refreshingNumbers: "Refreshing numbers...",
			refreshingUsers: "Refreshing users...",
			title: ""
		},
		numintec: {
			status: {
				notConnected: "Numintec is not connected",
				connectHint: "Connecting your Numintec account will allow you to call in Bloobirds using the Numintec dialer and synchronise the phone activity.",
				connectQuestion: "Do you wish to connect your Numintec account?",
				connect: "Connect Numintec",
				status: "The integration is currently {{status}}",
				active: "active",
				inactive: "inactive",
				successfullyConnected: "Numintec successfully connected!",
				logInTitle: "Log in to your Numintec account",
				errorConnecting: "The user, password or api key are not correct. Please, try again and ensure that the user is an admin user."
			},
			title: "Numintec integration",
			account: "Numintec account",
			integrationName: "Bloobirds production",
			"delete": "Delete",
			users: "Numintec users",
			usersHint: "If you are not seeing some of your users, you can try to refresh them!",
			refresh: "Refresh",
			refreshing: "Refreshing users...",
			map: "Map your Bloobirds users with the Numintec users to match calls between systems.",
			numintecUserName: "Numintec user name",
			numintecUserExtension: "Numintec user extension",
			bloobirdsUser: "Bloobirds user",
			deleteAssurance: "Are you sure you want to delete this integration?",
			errorMappingSameUser: "You can't map the same user twice",
			defaultSignaturePhone: "Signature phone",
			defaultPhoneSaveOk: "Signature phone has been updated properly",
			defaultPhoneSaveKo: "There was a problem updating the phone, please try again",
			defaultPhoneNoNumintecUser: "This user has not any Numintec User Id assigned"
		},
		ringover: {
			status: {
				notConnected: "Ringover is not connected",
				connectHint: "Connecting your Ringover account will allow you to call in Bloobirds using the Ringover dialer and synchronise the phone activity.",
				connectQuestion: "Do you wish to connect your Ringover account?",
				connect: "Connect Ringover",
				status: "The integration is currently {{status}}",
				active: "active",
				inactive: "inactive",
				successfullyConnected: "Ringover successfully connected!",
				logInTitle: "Log in to your Ringover account",
				errorConnecting: "The user, password or api key are not correct. Please, try again and ensure that the user is an admin user."
			},
			title: "Ringover integration",
			account: "Ringover account",
			integrationName: "Bloobirds production",
			"delete": "Delete",
			users: "Ringover users",
			usersHint: "If you are not seeing some of your users, you can try to refresh them!",
			refresh: "Refresh",
			refreshing: "Refreshing users...",
			map: "Map your Bloobirds users with the Ringover users to match calls between systems.",
			ringoverUserName: "Ringover user name",
			ringoverUserExtension: "Ringover user extension",
			bloobirdsUser: "Bloobirds user",
			deleteAssurance: "Are you sure you want to delete this integration?",
			errorMappingSameUser: "You can't map the same user twice"
		},
		title: "Dialer",
		twilio: {
			accountSidPlaceholder: "Twilio account sid *",
			addPhoneNumber: "Add a phone number",
			applicationSidPlaceholder: "Twilio application sid *",
			authTokenPlaceholder: "Twilio auth token *",
			bloobirdsUsers: "Bloobirds users",
			confirmConnectTwilio: "Do you wish to connect your Twilio account?",
			connectTwilio: "Connect Twilio",
			connectedNumbers: "Connected numbers",
			connectedNumbersSubtitle: "Add your twilio numbers and assign them to your Bloobirds users to use them in our dialer.",
			enableCallRecording: "Enable call recording",
			enterTwilioNumber: "Enter your twilio phone number",
			here: "here",
			howToCreate: "See how to create an set up a Twilio account",
			integrationDeletedSuccess: "Twilio integration deleted successfully!",
			integrationUpdatedSuccess: "Twilio settings updated!",
			isVerifiedCalledId: "Is this number a Verified Caller ID?",
			location: "Location",
			mandatoryField: "This is a mandatory field",
			newPhoneNumber: "New phone number",
			noPhoneNumbersFound: "No phone numbers could be found",
			phoneByDefault: "Phone by default",
			phoneNumber_one: "Phone number",
			phoneNumber_other: "Phone numbers",
			requiredField: "This field is required",
			setUpTwilio: "Set up your Twilio Account",
			sid: "SID",
			sidNumber: "SID number",
			subtitle: "See how to create an set up a Twilio account ",
			title: "Twilio account",
			twilioConnectInfo: "Connecting your Twilio account will allow you to call with the Bloobirds dialer.",
			twilioNotConnected: "Twilio is not connected",
			updatePhone: "Update phone",
			verifiedCallerId: "Verified caller ID"
		}
	},
	email: {
		emailSafetySubtitle: "Configure general email safety settings, such as maximum number of emails sent per day, delay before sending the first email etc.",
		emailSafetyTitle: "Email safety",
		emailsPerDay: "Maximum emails sent by a user in a day",
		emailsPerDayTooltip: "Set the maximum number of emails that can be sent per day. This will prevent mail servers from treating your emails as high-volume mass mail, make emails go out more gradually, and allow you to promptly handle the responses. We recommend keeping this under 200 emails",
		emailsPerMinute: "Maximum emails sent by minute",
		emailsPerMinuteTooltip: "Set the maximum number of emails that could be sent via this email account per minute. For example, for Outlook accounts, keep it lower than 30. We recommend keeping it lower than 30",
		limitValidation: "It’s recommended that this field does not exceed emails/day limit.",
		minimumPerDay: "This field requires a minimum of one (1) email per day.",
		minimumPerMinute: "This field requires a minimum of one (1) email per minute.",
		placeholder: "Emails",
		required: "Required",
		title: "Email Settings",
		mappings: {
			title: "Email mappings",
			subtitle: "",
			table: {
				email: "Email",
				users: "Users",
				provider: "Provider",
				id: "ID",
				usersPlaceholder: "Bloobirds users",
				disconnect: "Disconnect",
				requiresReconnect: "Requires to be reconnected",
				accountName: "Account name"
			},
			emptyTitle: "No email mappings found"
		},
		connectionCard: {
			addedTime: "Added {{dateDistance}}",
			aliases: "Aliases",
			requiresToBeReconnected: "Requires to be reconnected",
			disconnect: "Disconnect",
			setDefault: "Set as default",
			addAlias: "Add Alias",
			changeSignature: "Change Signature",
			removeSignature: "Remove Signature",
			addSignature: "Add signature",
			createSignature: "Create a signature to add to this email",
			currentSignature: "Currently using the default signature"
		},
		tabs: {
			mappings: "Mappings"
		}
	},
	generalSettings: {
		language: {
			successMessage: "Language updated successfully",
			title: "Account language",
			subtitle: "Choose the language setting that will be used  across the account by default when creating new users."
		},
		assignment: {
			ownerPropagationFromCompany: "Enable Owner (Assigned To) propagation from a company to its related leads",
			ownerPropagationFromLead: "Enable Owner (Assigned To) propagation from a lead to its related company",
			subtitle: "Here you can decide whether the assignation could be propagated between leads and companies.",
			successMessage: "Account updated successfully!",
			title: "Assignment"
		},
		leads: {
			enableEmailMatching: "Enable lead email matching with existing companies",
			leadEmailMatchingSubtitle: "New leads matching in domain with an existing company will be automatically matched.",
			leadEmailMatchingTitle: "Lead email matching",
			title: "Leads"
		},
		tasks: {
			successMessage: "Account updated successfully!",
			enableCreateActivitiesWhenCompletingCallTasks: "Create call activities when manually completing a call task",
			createActivitiesWhenCompletingCallTasksSubtitle: "Here you can decide whether a call type next step will generate an activity and launch the Correct Contact Flow.",
			createActivitiesWhenCompletingCallTasksTitle: "Create activity for call tasks",
			title: "Tasks"
		},
		meetings: {
			beforeMeeting: "before the meeting",
			calendarEventCreateAlways: "Create the meeting always on Google / Outlook",
			calendarEventLetUsersDecide: "Let users decide if the calendar event will be created on Google / Outlook",
			calendarSubtitle: "After creating a meeting, the user will be able to create it in his or her calendar.",
			calendarTitle: "Calendar",
			contactBeforeMeetingSubtitle: "The user who creates a meeting will receive a task to confirm the attendance of those invited to the meeting.",
			contactBeforeMeetingTitle: "Contact before meeting task",
			createMeetingInBloobirds: "Create a meeting in Bloobirds every time someone registered in my database invites me.",
			enableCalendarEventCreation: "Enable the calendar event creation after meeting creation",
			enableCalendarEventCreationTooltip: "Enabling this option makes events created on Bloobirds to be created on your linked calendar. If this option is disabled, these events will only be visible in the Bloobirds view on calendar",
			enableContactBeforeMeeting: "Enable the contact before meeting task",
			informationRequiredSubtitle: "To create a meeting the user must have filled in all the required company and lead information.",
			informationRequiredTitle: "Information required",
			mandatoryInformation: "Make it mandatory to fill in information to create meetings",
			scheduleTask: "Schedule task",
			scheduledGeneratedOnWeekends: "I want the scheduled task to be generated on weekends",
			title: "Meetings"
		},
		subtitle: "These defaults will be applied to the entire account.",
		title: "General Settings for {{accountName}}"
	},
	objectCreation: {
		errorMessage: "Something went wrong",
		save: "Save",
		sectionContent: "Enable object creation from Bloobirds Chrome extension",
		sectionTitle: "Do you want to enable object creation from the extension?",
		subtitle: "Decide if your users can create leads, companies and/or opportunities from the Chrome. Extension. This is an account wide setting.",
		successMessage: "Object creation setting updated successfully!",
		title: "Object Creation"
	},
	relatedObjects: {
		title: "Salesforce Related Objects",
		subtitle: "Choose the title for each object from one of the object fields",
		iconTableHeader: "Icon",
		objectNameTableHeader: "Object name",
		titleFieldTableHeader: "Title field *",
		relationshipsFieldTableHeader: "Relationships *",
		valuesToShowTableHeader: "Values to show",
		valuesToShowTableHeaderTooltip: "Cards can display up to 6 fields. Card details will show all values on the extension",
		displayObjectTableHeader: "Display object",
		banner: {
			loading: "Synchronizing objects. DO NOT close the page or reload. This may take a few minutes",
			success: "New objects have been successfully synchronized!",
			error: "Could not retrieve related objects. No new objects could not be synchronized",
			noChanges: "List is already up to date. No more objects to synchronize."
		},
		loadingRelated: {
			title: "Synchronizing related objects",
			subtitle: "DO NOT close the page or reload before the process has been completed.",
			description: "This may take up a few minutes..."
		},
		errorRelated: {
			title: "Synchronizing objects failed",
			subtitle: "We could not retrieve related objects. Please try again.",
			description: "If this issue persists contact support",
			button: "Sync related objects"
		},
		noRelatedFound: {
			title: "No synchronized objects yet",
			subtitle: "Synchronize, configure and display related objects here",
			button: "Sync related objects"
		},
		successRelated: {
			title: "No new objects to synchronize",
			subtitle: "Seems like you don't have objects to sync",
			description: "Check your Salesforce configuration and come back after new objects have been created",
			button: "Sync new objects"
		},
		titleSelect: "Related objects for:",
		syncNewObjects: "Sync new objects",
		searchPlaceholder: "Search related objects",
		addFields: "Add fields",
		fieldRequired: "* Field required",
		titleSelectPlaceholder: "Choose a field as the title",
		relathionshipsTitlePlaceholder: "Relationships",
		tooltipAddValues: "Add values to show",
		tooltipEditValues: "Edit values to show",
		tooltipRequiredFields: "Choose a field as the title and another as the relationship",
		confirmCloseModal: {
			title: "Discar Object Value",
			subtitle1: "You’ll lose progress on the changes you’ve made.",
			subtitle2: "This action cannot be undone.",
			subtitle3: "Are you sure you want to continue?",
			confirm: "Confirm",
			cancel: "Cancel"
		},
		fieldsModal: {
			preview: "Preview",
			previewHelper: "Preview will show the first ten fields selected",
			title: "Add or edit object values",
			fieldsToDisplay: "Fields to display",
			selectPlaceholder: "Search...",
			selectHelper: "Drag and drop to reorder values or remove them",
			cancel: "Cancel",
			save: "Save values"
		},
		noFieldsAdded: {
			subtitle: "Add some fields to display them in the list",
			title: "No fields added"
		},
		relatedCreated: "Related object created successfully!",
		relatedUpdated: "Related object updated successfully!",
		relatedError: "There was an error creating/updating the related object, please try again later"
	},
	salesTeam: {
		accountAdmin: "Account admin",
		createNewUser: "Create new user",
		deleteButtonTooltip: "Delete user, remember that deleting a user will not delete it's historical data.",
		expired: "Expired",
		maxUsersCounter: "from {{maxUsersAllowed}} allowed.",
		maxUsersTooltip: "You reached the max amount of users allowed",
		noUsersCreated: "No users created yet",
		noUsersFound: "No users for the following search",
		pending: "Pending",
		resend: "Resend",
		resendInvitationError: "There was an issue resending the invitation, please try again later",
		resendInvitationSuccess: "invitation successfully resent",
		subtitle: "Add new users and manage their permissions.",
		title: "Sales team",
		usersTab: "Users",
		teamsTab: "Teams",
		userDeleteCallout: "Remember this will not delete the users' historical data but it won't be able to assign or filter by this user anymore",
		userDeleteConfirm: "Are you sure you want to continue?",
		teamsManagerOfWhich_one: "This user is the manager of one team",
		teamsManagerOfWhich_other: "This user is the manager of {{count}} teams",
		userDeleteWarning: "You are going to delete permanently the User {{userName}}",
		userDeletedSuccess: "User successfully deleted",
		usersSubtitle: "Users allowed are based on the users created. If you want to have more available you should delete old users. Remember that deleting an user doesn't delete the historic information from that user!",
		teamUsersPage: {
			title: "Teams",
			subtitle: " Create multiple teams and divide your users among them.",
			newTeamButton: "New Team",
			search: "Search...",
			filters: {
				clear: "Clear",
				sort: "Sort",
				sortLabels: {
					fromAZ: "Name from A-Z",
					fromZA: "Name from Z-A",
					lastUpdateRecent: "Last update most recent",
					lastUpdateOldest: "Last update oldest"
				},
				myTeamsCheckbox: "My teams",
				onlyAssociatedCheckbox: "Show only teams I’m part of"
			},
			teamCard: {
				manage: "Manage",
				manager_one: "Manager",
				manager_other: "Managers",
				teamMembers_one: "Team Members",
				teamMembers_other: "Team Members - {{count}}",
				noManager: "No manager added",
				noUsers: "No users in team"
			},
			createTeams: {
				createNewTeams: " Create a new team",
				newTeam: "New team"
			},
			teamManagementModal: {
				editTeam: "Edit team",
				createTeam: "Create team",
				teamInformation: "Team Information",
				icon: "Icon",
				name: "Name",
				nameInput: "Set a name for your team",
				timezone: "Timezone",
				teamMembers: "Team Members",
				noManagerBanner: "A team cannot be left without a manager",
				user: "User",
				role: "Role",
				add: "Add",
				nameRequired: "A name is required to save the team",
				addTeamMember: "Add team member",
				cancel: "Cancel",
				save: "Save",
				saveTooltip: "Cannot save team without manager",
				noUsers: "Cannot save team without users",
				"delete": "Delete",
				confirmDeleteUserModal: {
					deleteButton: "Confirm",
					cancelButton: "Go back",
					topMessage: "By deleting the user, they will lose access to:",
					cadenceWarning: "Team <strong>cadences and templates</strong>",
					filtersWarning: "<strong>Visibility</strong> in team filters",
					bottomMessage: "Re-adding them will require manual re-addition. <strong>Do you want to continue?</strong>",
					title: "Remove user from team"
				},
				confirmDeleteTeamModal: {
					deleteButton: "Confirm",
					cancelButton: "Go back",
					message: "Are you sure you want to delete the team?",
					submessage: "This action cannot be undone",
					title: "Remove team"
				},
				toasts: {
					create: {
						success: "Team created successfully",
						error: "Could not create team"
					},
					edit: {
						success: "Team saved succesfully",
						error: "Could not save team"
					},
					"delete": {
						success: "Team deleted succesfully",
						error: "Could not delete team"
					}
				},
				teamMemberCard: {
					manager: "Manager",
					user: "User"
				},
				userCreationRow: {
					searchUsers: "Search users",
					setRole: "Set Role",
					manager: "Manager",
					user: "User"
				}
			}
		}
	},
	tabs: {
		apiKeys: "API keys",
		chromeExtension: "Chrome Extension",
		dependencies: "Dependencies",
		dialers: "Dialers",
		email: "Email",
		fields: "Fields",
		generalSettings: "General settings",
		notifications: "Notifications",
		salesTeam: "Sales team",
		salesforceRelatedObjects: "Related objects",
		salesforceStatus: "Salesforce Status",
		views: "Views"
	}
};
var activityTimelineItem$1 = {
	activityFeed: {
		activityFrom: "Activity from",
		allLeads: "All leads",
		allUsers: "All users",
		myTasks: "My tasks",
		myActivities: "My activities",
		emptySearchSubtitle: "Modify your search and try again",
		emptySearchTitle: "We didn't find any matches for your search 🔍",
		footer: {
			add: "Add",
			createTask: "Create task",
			discarded: "Discarded",
			done: "Done",
			send: "Send"
		},
		magicFilter: "Magic Filter",
		noActivitiesPending: "No activities pending",
		search: "Search users...",
		select: "Select",
		selectUser: "Select user",
		selectLead: "Select lead",
		title: "Activity feed"
	},
	activityTooltip: {
		doNotShowThisAgain: "Do not show this again",
		emailTracking: {
			description: "With Bloobirds you can <strong>track your prospect's emails!</strong> With this feature you can know if your prospect <strong>opened</strong> an email and if he <strong>clicked</strong> on any of the URLs in the email text. There is even a counter that tells you how many times this happened!",
			title: "Email tracking"
		},
		linkedinTracking: {
			description: "LinkedIn messages are <strong>automatically synced in Bloobirds</strong>. After a conversation, your messages as well as the lead’s messages will be <strong>displayed as a conversation</strong> so you can review what happened last time you talk with each other!",
			title: "LinkedIn tracking"
		}
	},
	attachmentsDropdown: {
		tooltip: "Has attachments"
	},
	emailIcons: {
		hasBeenReplied: "Has been replied",
		tooltip: "{{openedTimes}} times opened \b {{clickedTimes}} times clicked`"
	},
	item: {
		IncomingCall: "Incoming call",
		MissedCall: "Missed call",
		OutgoingCall: "Outgoing call",
		assignedTo: "Assigned to",
		bounced: "Bounced",
		call: "call",
		callTo: "call to",
		clicked: "Clicked",
		clickedLink: "Clicked link",
		copilotCallout: {
			aiAnalysis: "Ai Analysis",
			crmUpdates: "CRM Updates",
			insights: "Insights",
			nextSteps: "Next Steps",
			buttons: {
				generating: "Generating",
				noResults: "No results to update",
				suggestions: "Suggestions to update",
				failed: "Failed, click to try again"
			}
		},
		copilotInsights: {
			addToInternalNote: "Add to internal note",
			addToNote: "Add to note",
			addedToNote: "Added to note",
			aiGeneratedNote: "Generated summary",
			backTo: "Back to {{type}} details",
			competitorsSubtitle: "Competitors mentioned by the lead during the {{type}}:",
			competitorsTitle: "Competitors",
			noResultsFound: "No {{title}} found",
			questionsAskedSubtitle: "These are the questions that were asked during the {{type}}:",
			questionsAskedTitle: "Questions asked",
			showMore: "Show more",
			showLess: "Show less",
			valueFitSubtitle: "Key points brought up during the conversation",
			valueFitTitle: "Value Fit"
		},
		emailNoSubject: "No subject",
		endedCadence: "Ended cadence",
		guests: "Guests",
		hideDetails: "Hide details",
		inboundActivity: "Inbound activity",
		join: "Join",
		linkedinConversation: "Linkedin conversation",
		manuallyLoggedActivity: "Manually logged activity",
		markAsReported: "Mark as reported",
		meetingArranged: "Meeting arranged",
		meetingCreation: "Meeting creation",
		meetingResult: "Meeting result",
		meetingType: "Meeting type",
		newNote: "New note",
		noteCalendar: "Note (calendar)",
		noteInternal: "Note (internal)",
		sendNoteTaker: "Send Notetaker",
		notSendNoteTaker: "Not send Notetaker",
		noteTakerRemoveError: "There was an error removing your bot, please try again!",
		noteTakerRemoved: "Note taker successfully removed!",
		noteTakerSent: "Notetaker sent",
		noteTakerNotSent: "Notetaker not sent",
		noteTakerSentError: "There was an error sending your bot, please try again!",
		noteTakerSentOk: "Note taker successfully sent!",
		opened: "Opened",
		pin: "PIN",
		reminderSet: "Reminder set",
		reply: "Reply",
		replyAll: "Reply all",
		reportResult: "Report Result",
		reported: "Reported",
		rescheduledCadence: "Rescheduled cadence",
		sendAnother: "Send another",
		showDetails: "Show details",
		startNewNote: "Start typing your new note...",
		startedCadence: "Started cadence",
		stoppedCadence: "Stopped cadence",
		transcript: {
			backTo: "Back to {{type}} details",
			cantGenerateCall: "This transcript could not be generated because the call has not lasted enough",
			cantGenerateMeeting: "This transcript could not be generated because the meeting does not have an associated bot",
			generate: "Generate",
			generating: "Generating transcript. This could take up a few minutes",
			meetingProcessed: "The meeting is still being processed, the transcription will start in a few minutes",
			sentiment: "Sentiment",
			show: "Show transcript",
			transcription: "Transcription"
		},
		untitledCompany: "Untitled company",
		untitledLead: "Untitled lead",
		untitledOpp: "Untitled opportunity"
	},
	pastActivityFilters: {
		cadence: "Cadence",
		calls: "Calls",
		customTask: "Custom Task",
		emails: "Emails",
		inbound: "Inbound",
		linkedin: "LinkedIn",
		meetings: "Meetings",
		notes: "Notes",
		updates: "Updates"
	},
	reportedIconButton: {
		tooltipNoPermissions: "You don’t have permissions required to perform this action",
		tooltipNotReported: "Not reported",
		tooltipReported: "Reported"
	},
	toasts: {
		created: {
			success: "Activity created successfully",
			error: "There was an issue creating the activity"
		}
	}
};
var addLeadToActivityModal$1 = {
	assign: "Assign",
	callout: "Register this number if you want future calls to be associated with this lead.",
	cancel: "Cancel",
	checkbox: " Update also the lead phone number with the call number",
	title: "Assign call to a lead",
	toast: {
		error: "There was a problem assigning the lead.",
		success: "Assigned lead successfully!"
	}
};
var addToCalendarModal$1 = {
	addToCalendar: "Add to calendar",
	header: "Book a 30-minute meeting in your calendar",
	title: "Add to your calendar?",
	untitled: "Untitled event",
	"with": "with"
};
var ai$1 = {
	aiInsights: {
		aiInsights: "AI Insights",
		generating: "Generating",
		refresh: "Refresh"
	},
	aiAnalysis: {
		aiAnalysis: "AI Analysis",
		IncomingCall: "Incoming call",
		MissedCall: "Missed call",
		OutgoingCall: "Outgoing call",
		callResult: "Call result",
		leadNumber: "Prospect Prone number",
		callDate: "Call date",
		assignedTo: "Assigned to",
		meetingResult: "Meeting result",
		meetingType: "Meeting type",
		meetingCreation: "Meeting creation",
		attendees: "Attendees",
		play: "Play",
		pause: "Pause",
		changePlaySpeed: "Change Playback Speed",
		nextSpeaker: "Next Speaker",
		skipBack: "Skip Back",
		skipForward: "Skip Forward",
		seeOnSfdc: "See on Salesforce",
		summary: "Summary",
		transcript: "Transcript",
		insights: "Insights",
		activities: "Activities",
		meetingSummary: "Meeting Summary",
		callSummary: "Call Summary",
		searchTranscript: "Search in transcript",
		searchTranscriptTooltip: "Search in the transcription...",
		meetingTranscript: "Meeting Transcript",
		callTranscript: "Call Transcript",
		insightsFor: "Insights for",
		noTranscript: "No results found",
		noTranscriptDescription: "The search has not reported any results. Change the keywords to highlight matches within the transcript",
		noInsights: "No insights generated",
		noInsightsDescription: "Review your prompts and see if the activity type is the right one for the current activty.",
		noInsightsDescriptionTry: "You can also try to generate them manually",
		noInsightsButton: "Regenerate insights"
	}
};
var assignUserModal$1 = {
	assignAction: "Assign {{bobjectName}} to another user",
	callout: {
		noSales: "The assigned {{bobjectName}} will appear in the {{tab}} tab. If there are any pending tasks, they will be assigned to the new owner.",
		sales: "The {{bobjectName}} will be assigned to the new owner. If there are any pending tasks, they will be reassigned as well."
	},
	dropdown: {
		placeholder: "Search user",
		title: "Reassign chat to another user"
	},
	importName: "Update Assignee in {{total}} {{bobjectName}}",
	me: "Assign to me",
	other: "Assing to another user",
	recommendation_a: "'It’s highly recommended to assign an \n object to work with it in Bloobirds.",
	recommendation_b: "Choose who you want to assign it to",
	toast: {
		success: "Users Assigned successfully!"
	}
};
var bobjectSelector$1 = {
	link: "Link",
	noResultsFound: {
		subtitle: "Try other search terms",
		title: "No results for “{{searchTerm}}”"
	},
	noSearchYetMessage: "Search for people, companies or deals to link to this note",
	noSearchYetMessageB2CAccounts: "Search for people or deals to link to this note",
	search: "Search..."
};
var bobjectTypes$1 = {
	activity: "activity",
	activity_one: "activity",
	activity_other: "activities",
	all: "All",
	company: "company",
	company_one: "company",
	company_other: "companies",
	contact: "contact",
	contact_one: "contact",
	contact_other: "contacts",
	lead: "lead",
	lead_one: "lead",
	lead_other: "leads",
	meeting: "meeting",
	meeting_one: "meeting",
	meeting_other: "meetings",
	opportunity: "opportunity",
	opportunity_one: "opportunity",
	opportunity_other: "opportunities",
	task: "task",
	task_one: "task",
	task_other: "tasks"
};
var bobjects$1 = {
	assignToSelector: {
		placeholder: "Search",
		userOptions: {
			noResultsSubtitle: "Try other terms",
			noResultsTitle: "No results for this search",
			unnamed: "Unnamed"
		}
	},
	autoCompleteSearchLeads: {
		noResults: "No results found",
		placeholder: "Search leads"
	},
	bobjectForm: {
		emailNotValid: "Invalid email address",
		phoneNotValid: "The phone number is not valid.",
		referenceField: {
			companiesPlaceholder: "Search companies",
			createCompany: "Create company {{companyName}}",
			createNewCompany: "Create new company {{companyName}}",
			matchingCompany: "Matching company {{companyName}}",
			noMatchingCompany: "No matching company found",
			noResults: "No results found",
			possibleMatch_one: "{{count}} possible match",
			possibleMatch_other: "{{count}} possible matches",
			referencedTooltip: "Leads will be saved and assigned to companies if a match for the company name is found in Bloobirds. If the company name cannot be found the lead is saved without a company.",
			searchResults: "Search results"
		},
		requiredMessage: "This field is required"
	},
	bobjectItem: {
		all: "All",
		attempts: "Attempts",
		lastAttempt: "Last attempt",
		lastTouch: "Last touch",
		touches: "Touches"
	},
	bobjectSelector: {
		link: "Link",
		noResultsFound: {
			subtitle: "Try other search terms",
			title: "No results for “{{searchTerm}}”"
		},
		noSearchYetMessage: "Search for people, companies or deals to link to this note",
		search: "Search ..."
	},
	confirmDeleteModal: {
		bulkMessage: "You're about to permanently delete {{count}} {{bobjectType}}.",
		cancel: "Cancel",
		"delete": "Delete",
		deleteBulk: "Delete {{bobjectType}}",
		message: "You're about to permanently delete the {{bobjectType}}\n {{bobjectName}}.",
		subtitle: "<strong>This action cannot be undone</strong>, are you sure you want to continue?",
		title: "Delete {{bobject}}"
	},
	rescheduleModal: {
		customDateDialog: {
			cancel: "Cancel",
			send: "Send",
			today: "Today"
		},
		error: "The cadence has been edited and this step no longer exists, it's not possible to reschedule the whole cadence",
		inOneWeek: "In one week",
		inTwoDays: "In two days",
		nextMonday: "Next Monday",
		rescheduleWholeCadence: "Reschedule whole cadence",
		selectDateAndTime: "Select date and time",
		title: "Reschedule task",
		tomorrow: "Tomorrow"
	},
	skipTaskModal: {
		none: "None",
		placeholder: "Skipped task reasons",
		required: "A skip reason is required",
		save: "Save",
		subtitle: "Please, select a skipping reason",
		title: "Skipped task"
	}
};
var brandedButtons$1 = {
	googleSignIn: "Sign in with Google",
	outlookSignIn: "Sign in with Outlook"
};
var cadence$1 = {
	cadenceControlModal: {
		assignCadenceDropdown: {
			admin: {
				assignToMe: "Assign to <strong> me </strong>and start cadence",
				startCadence: "Start cadence for <strong>{{name}}</strong>",
				subtitle: "What do you want to do?",
				title: "⚠️ This {{bobjectType}} is not assigned to you. Cadence tasks are always assigned to the current owner."
			},
			assignCompany: "Assign company",
			assignCompanyAndLeads: "Assign company & leads",
			assignLead: "Assign lead",
			assignLeadAndCompany: "Assign company & lead",
			assignStart: "Assign & Start",
			noPermissionsTooltip: "You don’t have permissions to start a cadence as this {{bobjectType}} it is not assigned to you",
			start: "Start",
			title: "This {{bobjectType}} should be assigned in order to enroll it in a cadence. <strong>Do you want to assign it to you and continue?</strong>",
			tooltip: "If the company is already assigned, then it will be reassigned to you"
		},
		cadenceControl: "Cadence control",
		createNextStep: {
			back: "Back",
			dueDate: "Due date",
			placeholder: "Describe your task... ",
			save: "Save & schedule next step"
		},
		createNextStepTitle: "Create next step",
		feedbackStep: {
			accept: "Accept",
			subtitle: "🕒 This process may take several minutes, close this window while the process is being completed.",
			title: " The cadence tasks will appear in the next few minutes in the on cadence tab."
		},
		nextStep: {
			accept: "Accept",
			"continue": "Continue",
			nextStep: {
				message: "Currently there is no cadence in progress.",
				title: "What do you want to do next?"
			},
			noKeepCadence: "No, keep it going",
			radioButtons: {
				configureCadence: "I want to configure a new cadence",
				configureCadenceTooltip: "You can't assign a cadence if the {{bobjectType}} is not assigned",
				nextStep: "I want to manually schedule a next step",
				nothingElse: " I don't want to do anything else"
			},
			stopCadence: {
				message: "The <strong>{{cadenceName}} cadence</strong> is currently in progress, and started on {{cadenceDate}}.",
				title: "Do you want to stop the cadence?"
			},
			title: "Cadence control for {{bobjectName}}",
			yesStopCadence: "Yes, stop the cadence"
		},
		selectCadence: "Select the cadence",
		untitledCompany: "Untitled company",
		updatesLeadStatus: "Updates lead status",
		yourTasksAreBeingRescheduled: "Your tasks are being processed"
	},
	cadencePreview: {
		"auto-mail": "Auto-mail",
		automatedEmail: "Automated email",
		call: "Call",
		customTask: "Custom task",
		day: "Day",
		email: "Email",
		linkedin: "LinkedIn",
		linkedinMessage: "LinkedIn message",
		phoneCall: "Phone call",
		task: "Task"
	},
	cadenceSelector: {
		active: "Active",
		automated: "Automated",
		createNewCadence: "Create a new cadence",
		days: "Days",
		myCadences: "My Cadences",
		noResults: "There are no results for your search.",
		officialCadences: "Official Cadences",
		showOnlyMine: "Show only Mine",
		showOnlyNurturing: "Show only Nurturing Cadences",
		showOnlyOfficial: "Show only Official",
		steps: "Steps",
		teamCadences: "Team Cadences",
		view: "View"
	},
	cadenceTable: {
		header: {
			allItem: "{{bobjectType}} and all leads",
			kindFilter: {
				anyType: "Any type",
				attempts: "Attempts",
				incoming: "Incoming",
				missed: "Missed",
				outgoing: "Outgoing",
				placeholder: "Type",
				touches: "Touches"
			},
			noCadenceAssigned: "No cadence assigned",
			noLeadAssigned: "No lead assigned",
			placeholder: "Cadence & activity from",
			show: "Show",
			timeWindowFilter: {
				daily: "Daily",
				monthly: "Monthly",
				placeholder: "Time window",
				weekly: "Weekly"
			},
			today: "Today",
			unnamedCadence: "Unnamed cadence"
		},
		timetable: {
			column: {
				today: "Today"
			},
			components: {
				"auto-mail": "Auto-Mail",
				call: "Call",
				email: "Email",
				firstActivity: "First activity",
				firstCadenceDay: "First cadence day",
				inbound: "Inbound",
				lastActivity: "Last activity",
				lastCadenceDay: "Last cadence day",
				linkedin: "LinkedIn",
				meeting: "Meeting",
				statusChange: "C. Status",
				task: "Task"
			}
		}
	},
	configureCadence: {
		back: "Back",
		bottomCallout: " If you select a past date, only today and future tasks will be scheduled. If you want all the cadence tasks to be scheduled, select a future date or today.",
		bulkInfo: "The selected cadence will replace the default cadence.",
		cadence: "Cadence",
		datePlaceholder: "Start cadence date *",
		leadStatusCallout: "If they come from previous status New, Backlog and Delivered, both the <strong>lead and its company</strong> (if available) will change to status <strong>on prospection</strong>.",
		none: "None",
		placeholder: "{{bobjectType}} cadence *",
		recommendedStage: "This is your recommended {{stage}} cadence!",
		selectDateInfo: "Select a date to continue.",
		start: "Start",
		startCadenceDateInfo: "Remember to change the start cadence date to start a new cadence",
		title: "Which cadence do you want to use?",
		toast: "Cadence started for the {{bobjectType}}",
		topCallout: "This account does not have cadences for lead.<br> <0>Go to My Playbook ></0> <1>{{cadence}}</1> <2>to set up your first one!</2>"
	},
	hooks: {
		stopErrorToast: "There was an error stopping the cadence, please try again!",
		stopSuccessToast_one: "Cadence has been successfully stopped",
		stopSuccessToast_other: "Cadences have been successfully stopped"
	},
	previewTemplateModal: {
		title: "Preview email: "
	},
	rescheduleCadence: {
		customDateDialog: {
			cancel: "Cancel",
			send: "Send",
			today: "Today"
		},
		error: "The cadence can't be rescheduled due to it's configuration. Check with your admin.",
		inOneWeek: "In one week",
		inTwoDays: "In two days",
		nextMonday: "Next Monday",
		rescheduleWholeCadence: "Reschedule whole cadence",
		selectDateAndTime: "Select date and time",
		title: "Reschedule cadence",
		subtitle: "The task and cadence will be moved to the selected date",
		nextStepIn: "Next step in:",
		tomorrow: "Tomorrow"
	},
	stopCadenceModal: {
		cancel: "Cancel",
		message: "You're about to <strong> stop the cadence of this {{bobjectTypes}}</strong><br> <strong>This action cannot be undone, are you sure you want to continue?</strong>",
		messageBulk: "You're about to <strong> stop the cadence of {{count}} {{bobjectTypes}}</strong><br> <strong>This action cannot be undone, are you sure you want to continue?</strong>",
		stopCadence: "Stop cadence",
		stopCadence_one: "Stop cadence",
		stopCadence_other: "Stop cadences"
	}
};
var calendar$1 = {
	banner: {
		create: "Drag the slots on your calendar to share with others",
		edit: "Edit slots. Remove or add new slots to current selection",
		past: "You cannot create slots to past dates or hours"
	},
	cannotCreatePastSlots: "You cannot create slots on past times",
	description: "Add a time slot by clicking and dragging on the calendar",
	discardChanges: "Discard changes",
	events: {
		attendee_one: "{{count}} attendee",
		attendee_other: "{{count}} attendees",
		close: "Close share slots",
		closeConfirmation: "Any selected slots won't be saved. <b>This action cannot be undone</b>. Are you sure you want to continue?"
	},
	meetingDuration: "Meeting duration",
	meetingTitlePlaceholder: "Add meeting title...",
	minutes: "minutes",
	selectTimeBelow: "Select a time below the red marker or a future date",
	selectedSlots: "Selected slots"
};
var callDetail$1 = {
	noCallRecordingMessage: "No recording available"
};
var captureSalesforce$1 = {
	confirmationModal: {
		cancel: "Cancel",
		contentText: "The related {{sobjectType}} <strong>is assigned to {{assignedName}}</strong>, if you synchronise it in Bloobirds the assignment will remain the same and the tasks and notifications will be assigned to the assigned user.",
		"continue": "Continue & sync",
		object: "object",
		sync: "Sync"
	}
};
var changeStatusModal$1 = {
	assignedTo: {
		Activity: "Which user do you want to assign this activity to?",
		Company: "Which user do you want to assign this company to?",
		Lead: "Which user do you want to assign this lead to?",
		Opportunity: "Which user do you want to assign this opportunity to?",
		Task: "Which user do you want to assign this task to?",
		placeholder: "Assigned to {{required}}"
	},
	modalTitle: "Update {{bobjectType}} status",
	reasonedStatus: {
		placeholder: "{{bobjectType}} {{selectedStatus}} reason{{required}}",
		title: "What is the reason for the change in status?"
	},
	stopCadenceWarning: "This selected status will <strong>stop</strong> the cadence!",
	title: {
		Activity: "Do you want to update the activity status?",
		Company: "Do you want to update the company status?",
		Lead: "Do you want to update the lead status?",
		Opportunity: "Do you want to update the opportunity status?",
		Task: "Do you want to update the task status?"
	},
	unassignedWarning: "The selected status will leave the {{bobjectType}} unassigned."
};
var changeTzModal$1 = {
	africa: "Africa",
	america: "America",
	antartica: "Antartica",
	asia: "Asia",
	australia: "Australia",
	change: "Change",
	europe: "Europe",
	myTimezone: "My timezone",
	title: "Change timezone"
};
var emailTemplatePage$1 = {
	modal: {
		title: "What kind of template do you want to create?",
		description: "Choose the type of template that suits you the most according to your needs.",
		bloobirdsTemplateDescription: "A complete editor that includes variables, calendar links and many tools to customize your messages",
		htmlTemplateDescription: "A basic HTML editor where you can paste and preview your Marketing templates"
	}
};
var common$1 = {
	Activities: "Activities",
	Emails: "Emails",
	LinkedIn: "LinkedIn",
	Overview: "Overview",
	Pitches: "Pitches",
	Playbook: "Playbook",
	QQs: "QQs",
	Relations: "Relations",
	Tasks: "Tasks",
	accept: "Accept",
	account: "Account",
	accountExecutive_one: "Account executive",
	accountExecutive_other: "Account executives",
	activeCampaign: "Active Campaign",
	activity: "Activity",
	activity_other: "Activities",
	add: "add",
	aircall: "Aircall",
	all: "All",
	allValuesSelected: "All values selected",
	assign: "Assign",
	assignedTo: "Assigned to",
	astroline: "Astroline",
	automation: "Automation",
	automation_other: "Automations",
	back: "Back",
	bloobirds: "Bloobirds",
	bubble: "Bubble",
	buyerPersona: "Buyer Persona",
	buyerPersona_other: "Buyer Personas",
	cadence: "Cadence",
	cadenceByDefault: "Cadence by default",
	cadence_other: "Cadences",
	call: "Call",
	callWith: "Call with",
	cancel: "Cancel",
	category: "Category",
	category_other: "Categories",
	checkYour: "Check your",
	clear: "Clear",
	close: "Close",
	closed: "closed",
	collapse: "Collapse",
	company: "Company",
	company_one: "Company",
	company_other: "Companies",
	complete: "Complete",
	completed: "Completed",
	confirm: "Confirm",
	contact: "Contact",
	"continue": "Continue",
	copilot: "Copilot",
	create: "Create",
	creationDate: "Creation date",
	customTask: "Custom Task",
	customTask_other: "Custom Tasks",
	dashboard_one: "Dashboard",
	dashboard_other: "Dashboards",
	date: "Date",
	day: "Day",
	day_other: "Days",
	daysAgo: "{{days}} days ago",
	"delete": "Delete",
	description: "Description",
	discard: "Discard",
	dismiss: "Dismiss",
	dynamics: "Dynamics",
	edit: "Edit",
	email: "Email",
	emailTemplate: "Email template",
	emailTemplate_other: "Email templates",
	ended: "Ended",
	expand: "Expand",
	failed: "Failed",
	fieldRequired: "This field is required",
	from: "from",
	generalSettings: "General Settings",
	generating: "Generating",
	goBack: "Go back",
	goSafety: "Go to safety",
	highPriority: "High priority",
	hour: "Hour",
	hour_other: "Hours",
	hubspot: "Hubspot",
	important: "Important",
	inDays: "In {{days}} days",
	justcall: "JustCall",
	kpis: "KPIs",
	last_visited: "Last visited",
	lead: "Lead",
	lead_other: "Leads",
	learnMore: "Learn more",
	less: "less",
	link: "Link",
	linkedInTemplate: "LinkedIn template",
	linkedInTemplate_other: "LinkedIn templates",
	logout: "Log Out",
	meetingArranged: "Meeting arranged",
	meetingLinks: "Meeting Links",
	meetingWith: "Meeting with",
	messagingSegmentation: "Messaging segmentation",
	minimise: "Minimise",
	minute: "Minute",
	minute_other: "Minutes",
	more: "more",
	name: "Name",
	never: "Never",
	"new": "New",
	noPriority: "No priority",
	noResultsFound: "No results found",
	noSubject: "No subject",
	none: "None",
	note: "Note",
	notPrintable: "Not printable",
	numintec: "Numintec",
	ok: "Ok",
	open: "Open",
	openInNewTab: "More details",
	opportunity: "Opportunity",
	opportunity_other: "Opportunities",
	overdue: "Overdue",
	phone: "Phone",
	pipedrive: "Pipedrive",
	pitch: "Pitch",
	pitch_other: "Pitches",
	preview: "Preview",
	product: "Product",
	product_other: "Products",
	prospecting: "Prospecting",
	prospectingAbr: "Pr",
	qualifyingQuestion: "Qualifying Question",
	qualifyingQuestion_other: "Qualifying Questions",
	recording: "Recording",
	refresh: "Refresh",
	remove: "Remove",
	report: "Report",
	reportResult: "Report result",
	report_other: "Reports",
	reschedule: "Reschedule",
	rescheduled: "Rescheduled",
	retrieving: "Retrieving",
	ringover: "Ringover",
	sales: "Sales",
	salesAbr: "Sa",
	salesPipeline: "Sales pipeline",
	salesforce: "Salesforce",
	save: "Save",
	scenario: "Scenario",
	scenario_other: "Scenarios",
	search: "Search",
	searchLeads: "Search leads",
	segmentation: "Segmentation",
	select: "Select",
	selected: "Selected",
	setCadence: "Set cadence",
	settings: "Settings",
	show: "Show",
	showAll: "Show all",
	showDisabled: "Show disabled",
	showDisabledWorkflowsTooltip: "All workflows are disabled, you cannot deactivate this option",
	sidePeek: "Side peek",
	skip: "Skip",
	snippet: "Snippet",
	snippet_other: "Snippets",
	somethingWentWrong: "Something went wrong",
	somethingWentWrongDescription: "The page you're trying to access does not exist",
	stage: "Stage",
	started: "started",
	status: "Status",
	statusUpdate: "Status update",
	stop: "Stop",
	stopped: "Stopped",
	subject: "Subject",
	successfullyDeleted: "successfully deleted",
	targetMarket: "Target Market",
	targetMarket_other: "Target Markets",
	task: "Task",
	taskAndReminders: "Tasks & Reminders",
	task_other: "Tasks",
	templatesAndSnippets: "Templates & Snippets",
	to: "To",
	today: "Today",
	tomorrow: "Tomorrow",
	transcript: "Transcript",
	twilio: "Twilio",
	untitledEvent: "Untitled event",
	user: "User",
	user_other: "Users",
	vtiger: "Vtiger",
	whatsapp: "WhatsApp",
	whatsappTemplate: "WhatsApp template",
	whatsappTemplate_other: "WhatsApp templates",
	welcome: "Welcome",
	"with": "With",
	yes: "Yes",
	yesterday: "Yesterday",
	you: "You",
	zoho: "Zoho"
};
var confirmCloseModal$1 = {
	cancel: "Cancel",
	close: "Close",
	discard: "Discard",
	subtitle: "<strong>This action cannot be undone</strong>, are you sure you want to continue?",
	title: "You already filled some information on your new {{type}}"
};
var contactFlowModal$1 = {
	statusNoteActions: {
		buttons: {
			back: "Back",
			manageTasks: "Manage tasks",
			finishReporting: "Finish reporting"
		},
		header: {
			saved: "Saved!"
		},
		statusColumn: {
			header: "Update status",
			description: "Do you want to update the {{bobjectType}} status?"
		},
		toasts: {
			updateSalesforceSuccess: "Status updated successfully!",
			updateSalesforceError: "There was an error updating opportunity {{error}}",
			noteSuccess: "Note saved successfully!",
			errorUpdatingNote: "There was an error updating the note, please try again!"
		},
		updateRelatedStatus: "Update related object status",
		noteColumn: {
			header: "Call Notes",
			description: "Is there something you need to remember from this call?",
			placeholder: "Start typing your new note...",
			call: "call",
			meeting: "meeting"
		},
		quickActionColumn: {
			header: "Quick Actions",
			description: "Is there something else you need to do?",
			actionCard: {
				completeCurrentTask: "Complete current task",
				email: {
					title: "Send an email",
					hasTask: "You have an incomplete task to send an email to the lead",
					noTask: "Send an email to the lead"
				},
				whatsapp: {
					title: "WhatsApp",
					hasTask: "You have an incomplete task to send a WhatsApp message to the lead",
					noTask: "Open whatsapp to send a new message to the lead"
				},
				task: {
					activeTitle: "Create next step",
					completedTitle: "Task Created ✨",
					hasTask: "Create a new task to stay engaged to your prospect",
					noTask: "Now you can stay engaged with your prospect without forgetting anything"
				}
			}
		}
	},
	callResult: {
		back: "Back",
		callInfo: {
			title: "{{direction}} call <strong>{{phone}}</strong> at <strong>{{date}}</strong> <0>{{leadName}} {{companyName}}</0>"
		},
		incoming: "Incoming",
		missed: "Missed",
		noAnswer: {
			endCall: "End call report flow here",
			hint: "This can be changed at any time."
		},
		outgoing: "Outgoing",
		pitchUsed: {
			placeholder: "Pitch / Snippet used",
			title: "Did you get to pitch?"
		},
		save: "Save",
		saveAndContinue: "Save and Continue",
		skip: "Skip",
		title: "What is the call's result?",
		updateNumbers: {
			information: "{{bobjectName}} Information",
			title: "Do you want to update any of the registered numbers?"
		}
	},
	callResultOpp: {
		addInfo: "Do you want to add any information?",
		addNote: "Add a note",
		back: "Back",
		next: "Next",
		no: "No",
		notePlaceholder: "Start typing your new note...",
		skip: "Skip",
		title: "Have you been able to contact?*",
		yes: "Yes"
	},
	changeSalesStatus: {
		back: "Back",
		placeholder: "{{lead}} {{status}} reason",
		save: "Save",
		saveAndContinue: "Save and Continue",
		skip: "Skip",
		title: "Do you want to update the {{bobject}} status?",
		whatReason: "What is the reason for the change in status?"
	},
	changeStatus: {
		back: "Back",
		cancel: "Cancel",
		companiesStatusMessage: "<strong>The selected company status will stop the cadence.</strong> All future communication needs to be scheduled manually and should be based on what you discussed during your call.",
		leadStatusTexts: {
			LEAD__STATUS__CONTACT: "I need to create an opportunity or review an existing one",
			LEAD__STATUS__CONTACT_NO_CREATE_LEAD: "The lead has become a new contact to create a future opportunity",
			LEAD__STATUS__CONTACTED: "I got in touch with the lead, but they aren't interested yet",
			LEAD__STATUS__DISCARDED: "I should stop contacting the lead and discard them",
			LEAD__STATUS__ENGAGED: "I got in touch with the lead, they're interested!",
			LEAD__STATUS__MEETING: "The lead accepted a meeting, and I need to schedule it",
			LEAD__STATUS__NURTURING: "I should stop contacting the lead and try again in the future",
			LEAD__STATUS__ON_PROSPECTION: "I couldn't reach the lead yet and I want to keep trying"
		},
		placeholder: "{{bobject}} {{status}} reason",
		save: "Save",
		saveAndContinue: "Save and Continue",
		skip: "Skip",
		toasts: {
			success: "Status updated succesfully!"
		},
		tooltipDictionary: {
			COMPANY__STATUS__CONTACTED: "Used for when you have a correct contact. You got in touch with the right person",
			COMPANY__STATUS__DISCARDED: "Used for when the qualifying questions indicate the company is not a potential client. This will set all leads within the company to Discarded status as well",
			COMPANY__STATUS__ENGAGED: "Used for when one of the leads has the status Engaged. The company status then changes accordingly.",
			COMPANY__STATUS__MEETING: "Used for when you schedule a meeting between a lead and the Account Executive",
			COMPANY__STATUS__NURTURING: "Used for when it has not been possible to contact any lead within the cadence period. This will set all leads within the company to Nurturing status as well.",
			DEFAULT_TEXT: "The lead and company status are closely related, therefore depending on the selected lead status the company status may change as well",
			HEADER_TEXT: "The lead and company status are closely related, therefore depending on the selected lead status the company status may change as well",
			LEAD__STATUS__CONTACTED: "Used for when you got in touch with the lead",
			LEAD__STATUS__DISCARDED: "Used for when the lead is not a suitable contact to continue prospecting with",
			LEAD__STATUS__ENGAGED: "Used for when the lead is interested and has answered the qualifying questions",
			LEAD__STATUS__MEETING: "Used for when you have scheduled a meeting between the lead and the Account Executive",
			LEAD__STATUS__NURTURING: "Used for when you were not able to contact the lead within the cadence period but you want to try again later"
		},
		whatReason: "What is the reason for the change in status?"
	},
	notesAndQQ: {
		addNote: "Add a note",
		back: "Back",
		fillQQ: "Fill in the qualifying questions",
		none: "None",
		notePlaceholder: "Start typing your new note...",
		saveAndContinue: "Save and Continue",
		skip: "Skip",
		title: " How was the call?"
	},
	scheduleNextSteps: {
		assignedTo: "Assigned to",
		back: "Back",
		dueDate: "Due date",
		placeholder: "Describe your task... ",
		saveAndSchedule: "Save & schedule next step",
		skip: "Skip"
	},
	titles: {
		callResult: "Report call result",
		callResultOpp: "Report call result",
		changeSalesStatus: "",
		changeStatus: "Updates the status and decide on the next step",
		convertObject: "Send to sales",
		initial: "",
		notesAndQQs: "Report call result",
		opportunityControl: "Opportunities Control",
		scheduleNextSteps: "Create next step"
	}
};
var copyText$1 = {
	copied: "Copied! ✨",
	copyToClipboard: "Copy to clipboard"
};
var crmUpdatesModal$1 = {
	accept: "Accept",
	acceptAllSuggestions: "Accept all suggestions",
	acceptSuggestion: "Accept suggestion",
	cancel: "Cancel",
	confirm: "Confirm",
	entity: {
		all: "All",
		account: "Account",
		Contact: "Contact",
		Opportunity: "Opportunity"
	},
	confirmUpdatesModal: {
		doYouWishToContinue: "Do you wish to continue?",
		field: "field",
		fields: "fields",
		title: "Confirm CRM Updates",
		youCanGoBack: "You can go back and make more changes that you might have missed. Any other changes will be done manually afterwards.",
		youreAboutToMakeChangesTo: "You're about to make changes to:"
	},
	current: "Current",
	discard: "Discard",
	discardAllSuggestions: "Discard all suggestions",
	discardSuggestion: "Discard suggestion",
	discardUpdatesModal: {
		doYouWishToContinue: "Do you wish to continue?",
		field: "field",
		fields: "fields",
		ifYouDiscard: " If you discard changes you <strong>will lose all progress</strong> up to this point.",
		title: " Discard CRM Updates"
	},
	"new": "New",
	reset: "Reset",
	suggestAllAgain: "Suggest all again",
	title: "AI Suggested CRM Updates",
	updates: "{{entity}} Updates"
};
var dates$1 = {
	monthShortWithTime: "{month-short} {date-ordinal}, {time-24}",
	shortDayMonth: "{month-short} {date-ordinal}, {day}",
	shortMonth: "{month-short} {date-ordinal}",
	shortMonthFullDate: "{month-short} {date-ordinal} {year}, {time}",
	shortYear: "{month-short} {date-ordinal}, {year}",
	standardDate: "{month} {date-ordinal}, {year}"
};
var dayCalendar$1 = {
	calendarTips: "Calendar tips",
	calendars: "Calendars",
	shareSlots: "Share slots",
	today: "Today "
};
var detailedActivity$1 = {
	expandedBoxSection: {
		callDate: "Call date",
		callDuration: "Call duration",
		callReported: "Call reported",
		callResult: "Call result",
		leadNumber: "Lead number",
		noteAction: "Note (internal)",
		userNumber: "User number"
	}
};
var emailModal$1 = {
	bcc: "Bcc:",
	bodyPlaceholder: "Enter email body...",
	cc: "Cc:",
	createTemplate: "Create template",
	discard: "Discard email",
	emailScheduled: "Email scheduled for {{date}}. <0>Click here</0> to cancel it.",
	emptyConnection: "You need a connected email to send one-to-one emails from Bloobirds. Go to <1>Email Settings</1> to connect your email.",
	from: "From:",
	noEmailsConnectedYet: "No emails connected yet",
	preview: "Preview",
	saveTemplate: "Save as template",
	schedule: "Schedule email",
	send: "Send email",
	subjectNewEmail: "New email",
	subjectPlaceholder: "Subject",
	to: "To:",
	missingSubject: "Please enter a subject to send the email",
	toasts: {
		delay: "The email sending had a short delay 😞 Please check if it was sent correctly",
		disconnected: "Your email connection has been stopped and needs to be reconnected, check it at your user settings.",
		error: "Something went wrong while sending the email, please try again later",
		fileExceedSize: "The file you are trying to send exceeds the maximum size allowed",
		scheduleAction: "View email",
		scheduled: "Email scheduled for {{date}}",
		scheduledCancelled: "Email scheduled has been successfully cancelled and deleted",
		scheduledCancelledError: "Something went wrong while trying to cancel the scheduled email. Please try again later.",
		scheduledError: "Something went wrong while trying to schedule the email. Please check that all fields are filled correctly.",
		success: "Email sent successfully!",
		errorVariable: "The email could not be sent because the variable {{variable}} has not been filled in",
		errorVariableGeneric: "The email could not be sent because some variables have not been filled in",
		errorEmailTo: "Email cannot be sent without recipient email",
		errorSubject: "Email cannot be sent without subject"
	}
};
var en$1 = "English 🇬🇧";
var es$2 = "Spanish 🇪🇸";
var extendedScreen$1 = {
	bobjectDetail: {
		contactDetails: "Contact details",
		newEmail: "New email",
		outdatedInfo: "Outdated info?",
		sectionField: {
			copied: "Copied✨",
			copyToClipboard: "Copy to clipboard",
			edit: "Edit",
			save: "Save"
		},
		sections: {
			companyDetails: "Company details",
			companyEmails: "Company emails",
			companyLinkedIn: "Company LinkedIn",
			companyPhones: "Company phones",
			emails: "Emails",
			linkedIn: "LinkedIn",
			phones: "Phones"
		},
		validation: {
			email: "The email format is not valid",
			notEmpty: "Field can not be empty",
			phone: "The phone number is not valid",
			url: "The URL format is not valid"
		}
	},
	contactViewFields: {
		availableFields: "Available fields to display",
		searchText: "Search, find and delete any field you wish to be displayed in the data list",
		selectFieldsFrom: "Select fields from"
	},
	header: {
		close: "Close",
		switchToDraggable: "Switch to draggable",
		syncIssues: "Sync issues",
		syncIssuesMessage: "This {{type}} could not be synced with your CRM. Check the synchronize settings with your <strong>admin</strong> to review this issue.",
		syncIssuesMessageAdmin: "This {{type}} could not be synced with your CRM. Check the <strong>logs</strong> and <strong>sync</strong> settings to solve this issue.",
		viewLogs: "View logs"
	},
	relationObjectDetails: {
		searchPlaceholder: "Search fields...",
		searchHelp: "Filter fields by name",
		noResults: "No results for '{{searchText}}'",
		tryOtherSearch: "Try other search terms",
		openInSalesforce: "Salesforce"
	},
	templateDetail: {
		author: "Author",
		battleCard: "Battlecard",
		headerButtons: {
			edit: "Edit",
			editInBloobirds: "Edit in Bloobirds",
			openInLinkedin: "Open in LinkedIn",
			openInWhatsapp: "Open in WhatsApp",
			noPhoneNumber: "Set a phone number to use templates",
			send: "Send",
			sendEmail: "Send email",
			userCantEdit: "Only the Owner or an Admin can edit this template"
		},
		official: "Official Playbook Template",
		"private": "Private",
		"public": "Public",
		usedInXCadences: "Used in {{count}} cadences",
		metrics: {
			clickRate: "Click rate",
			openRate: "Open rate",
			replyRate: "Reply rate",
			timesDelivered: "Times delivered"
		}
	}
};
var extension$1 = {
	errorHandling: {
		title: "Seems like something went wrong ...",
		subtitle: "Our team has been notified. If you'd like to help, tell us what happened below.",
		toasts: {
			success: "Feedback sent successfully!",
			error: "Something went wrong when sending feedback"
		},
		form: {
			title: "Send us your feedback",
			validation: {
				required: "This field is required",
				commentLength: "Comment too long, you can add 250 words maximum"
			},
			namePlaceholder: "Your name",
			emailPlaceholder: "Your email",
			commentsPlaceholder: "I clicked on 'X' then hit 'Confirm...",
			maxWords: "{{count}}/250 words"
		},
		submit: "Submit",
		backToSafety: "Back to safety"
	},
	syncBBButtons: {
		addToCadence: "Add to cadence",
		syncIn: "Sync in "
	},
	salesforceToasts: {
		activityNotFound: "Activity not found in Bloobirds"
	},
	bulkActionsToast: {
		bulkAction: "Bulk action progress:",
		completed: "Completed  ✨",
		forNObjects: "for {{count}} objects",
		startingListBulk: "Starting list bulk action..."
	},
	buyerPersonaAffinity: {
		generating: "Generating",
		refresh: "Refresh",
		title: "Buyer persona affinity"
	},
	card: {
		assignTo: "Assign to",
		assignToLead: "Assign to lead",
		bobjectNameUndefined: "Untitled {{bobjectType}}",
		buyerPersona: "Buyer persona",
		call: "Call",
		callAgain: "Call again",
		callBack: "Call back",
		cancel: "Cancel",
		companySource: "Company source",
		conversationWith: "Conversation with",
		copilotAnalysis: "Has AI Analysis",
		editMail: "Edit mail",
		editTaskButton: "Edit Task",
		empty: "EMPTY",
		inviteeStatus: {
			maybe: "Maybe",
			no: "No",
			noReply: "Awaiting",
			yes: "Yes"
		},
		invitees_one: "{{count}} Guest",
		invitees_other: "{{count}} Guests",
		join: "Join {{value}}",
		leadAssignment: "Lead assignment",
		leadEmail: "Lead email",
		leadSource: "Lead source",
		markAsDone: "Mark as done",
		markAsDoneAttempt: "Make at least one attempt to mark as done",
		markAsDoneFuture: "This is a task for the future. You cannot mark it as done.",
		markAsDoneOverdue: "When you complete this task it will be marked as Completed Overdue",
		markAsImportant: "Mark as important",
		markAsRead: "Mark as read",
		markAsReported: "Mark as reported",
		messageNotParse: "Message could not be parsed into Bloobirds",
		navigateLinkedinErrorTooltip: "No LinkedIn URL to navigate to",
		navigateLinkedinTooltip: "Navigate to LinkedIn URL",
		navigateSalesforceTooltip: "Navigate to Salesforce record",
		nextStep: "Next step",
		noPermissions: "You don’t have permissions to perform actions on this {{bobject}}",
		noSalesforceIdCompany: "No Salesforce ID found for this company.",
		noSalesforceIdLead: "No Salesforce ID found for this lead.",
		noSalesforceIdOpportunity: "No Salesforce ID found for this opportunity.",
		notReportedMessages: "Not reported messages",
		numberOfLeads: "Nº of leads",
		openLinkedin: "Open in Linkedin",
		openLinkedinSalesNav: "Open in Sales Navigator",
		opportunityAmount: "Opportunity amount",
		read: "Read",
		reassign: "Reassign",
		reply: "Reply",
		replyAll: "Reply all",
		reportCall: "Report call",
		reschedule: "Reschedule",
		rescheduleTask: "Reschedule task",
		retry: "Retry",
		sendNow: "Send now",
		skipTask: "Skip task",
		targetMarket: "Target market",
		toasts: {
			changesSaved: {
				success: "Changes successfully saved"
			}
		},
		unmarkAsImportant: "Unmark as important"
	},
	draggableTopBar: {
		close: "Close",
		minimise: "Minimise",
		"switch": "Switch to extended"
	},
	login: {
		emailPlaceholder: "Email",
		failed: "Your login attempt failed. Make sure your credentials are correct.",
		forgotPassword: "Forgot your password?",
		login: "Log in",
		passwordPlaceholder: "Password",
		success: "Logged in!",
		termsAndConditions: "I accept the <0>Terms and Conditions</0>"
	},
	navigationBar: {
		taskCompleted: "All tasks completed <0>🚀</0>"
	},
	noteModal: {
		newNote: "New note",
		placeholder: "Start typing your new note...",
		save: "Save",
		titlePlaceholder: "New note: "
	},
	salesforcePages: {
		accountField: {
			syncAlsoAccount: "Sync also account",
			syncAccountAndContacts: "Sync also account and contacts related",
			title: "Account: <strong>{{accountName}}</strong>",
			titleAssigned: "This account cannot be synced because is assigned to {{salesforceOwnerName}} and is not mapped as Bloobirds user",
			titleDiffAssigned: "This account is assigned to another user",
			untitledCompany: "Untitled Company"
		},
		captureSalesforceForm: {
			account: "Account",
			assignedTo: "Assigned to",
			assignedToGroup: "<strong>is assigned to a group of users</strong>, consider assign in it to a user to create it in Bloobirds.",
			empty: "Empty",
			mapMoreFields: "Map more fields in Bloobirds",
			missingInfo: "Do you miss any information to be Synchronized?",
			nextStep: "Next step suggested",
			notMapped: "is not mapped as Bloobirds user. ",
			recordNotSynced: " 👉 This record cannot be synced because ",
			reviewMapped: "Review mapped users here.",
			saveAccountIn: "Save account in",
			saveContactIn: "Save contact in",
			saveLeadIn: "Save lead in",
			saveLeadToCompanyIn: "Save lead to company in",
			saveOpportunityIn: "Save opportunity in",
			toast: "There was an error creating your {{object}}",
			tooltipNotMapped: "The {{sobjectType}} Owner is not mapped to a Bloobirds user",
			tooltipOwner: "The {{sobjectType}} is owned by another user.",
			untitledAccount: "Untitled Account",
			untitledCompany: "Untitled Company",
			untitledLead: "Untitled lead"
		},
		companyField: {
			createNewCompany: "Create new company '{{companyName}}'",
			description: {
				createCompany: "Create company '{{companyName}}'",
				foundCompanies_one: "{{count}} possible match",
				foundCompanies_other: "{{count}} possible matches",
				matchingCompany: "Matching company '{{companyName}}'",
				noMatches: "No matching company found"
			},
			notFound: "Results not found",
			searchPlaceholder: "Search companies",
			searchResults: "Search results",
			tooltip: "Leads will be saved and assigned to companies if a match for the company name is found in Bloobirds. If the company name cannot be found the lead is saved without a company."
		},
		navigateMessageSalesforce: {
			extraInfo: "We can only capture the information of leads when you are viewing their profile.",
			tryNavigating: "👉 Try navigating to a lead, account or Opportunity."
		},
		relatedSalesforceUserPage: {
			SFDCUserPlaceholder: "Salesforce user",
			clickHere: "clicking here",
			"continue": "Continue",
			linkExplanation: "By linking your user you will be able to use the full potential of Bloobirds. Can't find your username? ",
			linkSalesforce: " Link your Salesforce User to get Started 🚀",
			loginToSF: "Login on Salesforce",
			notAbleToSignIn: "If you are not able to login or don't have enough permissions, choose manually your user ",
			refreshHere: "Refresh here",
			toast: {
				error: "There was a problem updating your user, please try again!",
				success: "User updated successfully!"
			},
			welcome: "Welcome, {{name}}!"
		}
	}
};
var generalSearchBar$1 = {
	all: "All",
	bannerSubtitle: "The <strong>general search bar</strong> is a tool that will allow you to search for different objects in all the database at the same time. To know more about how the search results are displayed check the article in our Knowledge Base ",
	bannerTitle: "Superpowered search",
	checkBox: "Don't show again",
	firstTimeSearch: {
		header: "Search what you need",
		subtitle1: "A normal search will display results that contains the terms searched",
		subtitle2: "Use filters to focus on a type of result",
		title1: "Search what you need",
		title2: "Filter for more results"
	},
	firstTimeSearchCompressed: {
		header: "Search what you need",
		subtitle1: "Using quotes on a search will display exact results",
		subtitle2: "Use filters to focus on a type of result",
		title1: "As precise as you want",
		title2: "Filter for more results"
	},
	learnMore: "Learn more",
	noRecentActivity: "No recent activity",
	noResults: {
		results: "results",
		subtitle: "It seems that there are no results for the criteria you have specified",
		title: "No {{bobjectType}} found"
	},
	openSearchBar: "Open the search bar with",
	preview: "Preview",
	showMore: "Show more",
	statistics: {
		attempts: "Attempts",
		lastAttempt: "Last attempt",
		lastTouch: "Last touch",
		touches: "Touches"
	}
};
var helperKeys$1 = {
	goals: {
		addFirstBuyerPersona: "Add your first Buyer Persona (ICP)",
		addYourFirstCadenceStep: "Add your first cadence step",
		callAndReportResult: "Make your first call",
		checkYourBuyerPersonas: "Check your Buyer Personas",
		checkYourTargetMarkets: "Check your Target Markets",
		chooseDialer: "Set up your dialer",
		connectCrmTour: "Connect your CRM",
		connectEmailAccount: "Connect your email account",
		createFirstCompany: "Add your first Company",
		createFirstEmailTemplate: "Create your templates",
		createFirstLead: "Add your first Lead",
		createFirstList: "Create your first custom list",
		createFirstTargetMarket: "Add your first Target Market",
		createLeadFromLinkedIn: "Create your first lead from LinkedIn",
		createYourFirstCadence: "Create your first cadence",
		createYourFirstPitch: "Create your first pitch",
		customizeCompanyFields: "Customize your company fields",
		customizeLeadFields: "Customize your lead fields",
		defineFirstScenario: "Define your Scenario",
		defineQualifyingQuestions: "Define your Qualifying Questions",
		downloadChromeExtension: "Download Chrome extension",
		enableKpiMetrics: "Enable your metric KPI metrics and activity",
		inviteTeam: "Start with the first invitation",
		launchYourFirstCadence: "Launch your first cadence",
		linkFirstMessageLinkedIn: "Link you first message from linkedin",
		markAsDoneAttempt: "Mark as done your first attempt",
		message: "Goal completed: ",
		saveNumberSettings: "Save your phone number settings",
		sendFirstAutoEmail: "Create an automatic cadence",
		sendYourFirstEmail: "Send your first email",
		setUpDashboardsTour: "Set up your dashboards view",
		setUpReminders: "Set up your reminders",
		setYourEmailSignature: "Set up your signature",
		startTasksFromCadence: "Start tasks from your “On Cadence” page",
		takeTourOnGeneralSettings: "Take the General Settings Tour",
		takeTourOnInbox: "Take the Bloobirds Inbox tour",
		takeTourOnOutbox: "Take the Bloobirds Outbox tour",
		takeTourProspectTab: "Take a tour on your prospect Tab"
	}
};
var home$1 = {
	centerContent: {
		blocks: {
			quickStartGuide: {
				title: "Your quick start guide 🚀"
			}
		},
		homeFiltersTooltip: {
			discovery: "Enable the KPIs you need the most at any time",
			footer: "With this filter you can choose to hide and display KPIs that you like most. Remember you can also order this sections by dragging and dropping them in their new positions"
		},
		quickStartGuideHidden: "Quick start guide cannot be hidden until is completed",
		resetHelpersButton: "Reset Helpers"
	},
	leftContent: {
		taskList: {
			allClear: "All clear ✨",
			everythingDone: "Looks like everything is done",
			loadMore: "Load More",
			noTypeSelected: "You should select a Task type to see tasks!",
			taskHomeCard: {
				rescheduleTask: "Reschedule the task",
				scheduledAt: "Scheduled at:"
			},
			tasksForToday: "Tasks for today"
		},
		todayTasks: "Today tasks"
	},
	title: "Welcome, {{userName}}!"
};
var languages$1 = {
	en: "English 🇬🇧",
	es: "Spanish 🇪🇸",
	it: "Italian 🇮🇹",
	pickALanguage: "Pick a language to work with",
	selectALanguage: "Select a language"
};
var leftBar$1 = {
	actions: {
		markAllReported: "Mark all as reported",
		readAll: "Mark all as read"
	},
	bulk: {
		actionDisabled: "In order to perform {{action}} in bulk, selected tasks have to belong to the same type of object",
		continueWithMaximum: "Continue with a maximum of 1000",
		reschedule: "Reschedule",
		results_one: "{{count}} result",
		results_other: "{{count}} results",
		selectAll: {
			companies: "Select all {{count}} companies",
			general: "Select all",
			leads: "Select all {{count}} leads",
			opportunities: "Select all {{count}} opportunities"
		},
		selectedAllText: {
			companies: "All <strong>{{selected}}</strong> selected companies from a total of <strong>{{totalMatching}}</strong>.",
			leads: "All <strong>{{selected}}</strong> selected leads from a total of <strong>{{totalMatching}}</strong>.",
			opportunities: "All <strong>{{selected}}</strong> selected opportunities from a total of <strong>{{totalMatching}}</strong>."
		},
		setCadence: "Set cadence",
		stopCadence: "Stop cadence"
	},
	card: {
		call: {
			IncomingCall: "Incoming call",
			MissedCall: "Missed call",
			OutgoingCall: "Outgoing call",
			from: "from ",
			note: "Note",
			"with": "with "
		},
		whatsapp: {
			assignMessage: "Assign or create a new contact",
			createContact: "Add contact",
			discardMessage: "Discard this message",
			lastMessage: "Last message",
			markAsRead: "Mark as read",
			message: "Message",
			reassignMessage: "Reassign the conversation to another team member",
			replyButton: "Reply",
			title: "WhatsApp conversation"
		}
	},
	userTeamsFilter: {
		teamsSelected_one: "One user selected",
		teamsSelected_other: "{{count}} users selected",
		userTeamsFilterPlaceholder: "Teams",
		allTeams: "All teams",
		me: "Me"
	},
	dateFilter: {
		allTime: "All time",
		allTimeUntilToday: "All time (until today)",
		lastMonth: "Last month",
		lastQuarter: "Last quarter",
		lastWeek: "Last week",
		lastYear: "Last year",
		next30days: "Next 30 days",
		next7days: "Next 7 days",
		sinceToday: "Since today",
		thisMonth: "This month",
		thisMonthUntilToday: "This month (until today)",
		thisQuarter: "This quarter",
		thisQuarterUntilToday: "This quarter (until today)",
		thisWeek: "This week",
		thisWeekUntilToday: "This week (until today)",
		thisYear: "This year",
		thisYearUntilToday: "This year (until today)",
		today: "Today",
		yesterday: "Yesterday"
	},
	errorChangeLng: "There was an error changing the language for {{language}}",
	filters: {
		all: "All",
		assignedTo: "Assigned to",
		date: "Date",
		failed: "Failed",
		lastAssigned: "Assigned date oldest",
		lastUpdateOldest: "Last update oldest",
		lastUpdateRecent: "Last update most recent",
		me: "Me",
		no: "No",
		orderBy: "Order by",
		paused: "Paused",
		priority: "Priority",
		quickFilters: "Quick filters",
		recentAssigned: "Assigned date most recent",
		reported: "Reported",
		copilotAnalysis: "AI Analysis",
		rescheduled: "Rescheduled",
		reset: "Clear",
		saveQuickFiltersQuestion: "Would you like to save this search?",
		saveQuickFiltersText: "Create your first Quick filter",
		scheduled: "Scheduled",
		stages: "Stages",
		status: "Status",
		taskType: "Task type",
		succesfullySent: "Succesfully sent",
		yes: "Yes",
		timezoneRange: {
			placeholder: "Tasks in all contact time zones",
			title: "Filter tasks by the <strong>local time zone</strong> of contacts:",
			quickFilters: {
				allDay: "All day",
				labourHours: "Working hours",
				mornings: "Mornings only",
				afternoons: "Afternoons only"
			},
			from: "from {{hour}}",
			to: "until {{hour}}",
			clear: "Clear",
			displayValue: "From {{start}} to {{end}}"
		}
	},
	footer: {
		accountSettings: "Account settings",
		cadence: "Cadences",
		chromeExtension: "Chrome extension",
		dashboard: "Dashboards",
		dialers: "Dialers",
		help: "Help",
		meetingLinks: "Meeting Links",
		notifications: "Notifications",
		report: "Reports",
		salesTeam: "Sales team",
		"task&Reminders": "Tasks & Reminders",
		userSettings: "User settings"
	},
	inactive: "Inactive",
	inbox: "Inbox",
	leftBarHints: "Left bar hints",
	meetings: "Meetings",
	noResultsPage: {
		createNewTask: "Create new task",
		emptyTaskList: {
			description: "Looks like everything is done!",
			title: "All clear ✨"
		},
		noFilterResults: {
			description: "Try modifying your filter criteria",
			title: "No results found 🔍"
		},
		noFilterSelected: {
			description: "Select a filter to display results",
			title: "No filter selected 👆"
		}
	},
	nurturing: "Nurturing",
	outbox: "Outbox",
	overdueTasks: "Overdue tasks",
	pipeline: "Pipeline",
	quickFilters: {
		activePipeline: "Active Pipeline",
		automatedEmails: "Automated Emails",
		calls: "Calls",
		delivered: "Delivered",
		emails: "Emails",
		firstMeeting: "First Meeting",
		followUp: "Follow Up",
		linkedin: "Linkedin",
		manualTasks: "Manual Tasks",
		meetingReminders: "Meeting Reminders",
		onCadence: "On Cadence",
		scheduledEmails: "Scheduled Emails",
		tasks: "Tasks",
		whatsapp: "WhatsApp"
	},
	successChangeLng: "You've successfully change the language for {{language}}",
	tasks: "Tasks",
	todayTasks: {
		description: "All your tasks for today are here. Let's get them done! ✨",
		title: "Today tasks"
	},
	tour: {
		activities: {
			content: "Review every past interaction in this section, including calls, emails, meetings, and updates, with a detailed view.",
			title: "Activities"
		},
		contactabilityTools: {
			content: "From calls and emails to notes and tasks, every tool you need to stay in contact is just one click away. Let's start prospecting! ✈️",
			title: "Contactability tools"
		},
		overview: {
			content: "Check the main information for a company, lead, or opportunity. You can also check past activity and display key data.",
			title: "Overview"
		},
		playbook: {
			content: "Our Playbook in-app helps reps follow the sales strategy without even realising it. ✨ (PSST, this works especially well in our smart email editor! ✉️)",
			title: "Playbook"
		},
		tasks: {
			content: "Don't forget what you need to do! Overdue, today, and future tasks are all grouped here. Let's get them done! ✨",
			title: "Tasks"
		}
	},
	undoToast: {
		title_one: "{{count}} task completed",
		title_other: "{{count}} tasks completed"
	}
};
var linkedInDetail$1 = {
	messageNotAvailable: "Message could not be parsed into Bloobirds"
};
var meetingModal$1 = {
	accountExecutive: "Account executive",
	activityDetailForm: {
		requiredMessage: "Required information to close Meeting"
	},
	bloobirdsCalendarSelector: {
		accountExecutives: "Account Executives",
		calendar: "Calendar",
		selected: "Selected",
		users: "Users",
		you: "You"
	},
	calendar: {
		calendarNotConnected: {
			clickAndRefresh: "Already sign in. Click for refresh",
			connectGoogle: "Connect google calendar",
			connectOutlook: "Connect outlook calendar",
			syncBloobirds: "Sync your calendar with Bloobirds"
		},
		yourTimezone: "Your timezone hour"
	},
	calendarName: "Calendar",
	calendarSelector: {
		calendarAccount: "Calendar account",
		calendarsSelected: "Calendars selected",
		infoText: {
			howToAsk: "how to ask subscribe on colleague's calendars",
			learnHere: "Learn here",
			missingCalendar: " Are you missing any calendar?",
			toSeeIt: "to see it on Bloobirds"
		},
		myCalendars: "My calendars",
		noCalendarsSelected: "No calendars selected",
		otherCalendars: "Other calendars"
	},
	cancel: "Cancel",
	change: "Change",
	create: "Create",
	createEventInCalendar: "Create event in calendar",
	"delete": "Delete",
	guests: "Guests",
	inviteeCard: {
		ae: "AE",
		company: "Company",
		coworker: "Coworker",
		lead: "Lead",
		leadNoEmail: "Lead has no email, it won't be invited",
		organizer: "Organizer",
		user: "User"
	},
	inviteesNotSynced: " Invitees would not be synced to your Calendar",
	mainForm: {
		conferencingForm: {
			addGoogle: "Add Google Meet video conference",
			linkByGoogle: "Conference link by Google Meet",
			addTeams: "Add Microsoft Teams video conference",
			linkByTeams: "Conference link by Microsoft Teams"
		},
		date: "Date",
		durationMin: "Duration(min)",
		meetingDetails: "Meeting details",
		meetingResult: "Meeting result",
		reminderForm: {
			addNotificationEmail: "Add a notification email",
			days: "Days",
			emailTemplate: "Email template",
			hours: "Hours",
			minutes: "Minutes",
			myTemplates: "My templates",
			teamTemplates: "Team templates",
			thisFieldIsRequired: "This field is required",
			tooltipMessage: "Email notification will be sent from your email to the lead assigned to the meeting"
		},
		thisFieldIsRequired: "This field is required",
		title: "Title",
		tooltipMessage: "This is the Meeting Type, use only First Meeting in case that this meeting handovers the lead or company to the Account Executive"
	},
	meetingAssignedTo: "Meeting assigned to",
	meetingDetails: "Meeting details",
	notAllowedTitle: "You are not allowed to change this setting, ask your admin for more information",
	noteInternal: {
		placeholder: "Add your internal notes here...",
		title: "Note (Internal)"
	},
	noteCalendar: {
		placeholder: "Add your notes here...",
		title: "Notes to Calendar"
	},
	save: "Save",
	searchLeadsGuests: {
		addAnother: "Add other email or search lead",
		dropdownHeader: {
			coworkersEmails: "Coworker's emails",
			everywhere: "erywhere",
			inCompany: "in company",
			search: "Search"
		},
		invalidEmail: "Invalid email"
	},
	thisFieldIsRequired: "This field is required",
	timezone: "Timezone",
	toasts: {
		deleteSuccess: "Meeting successfully deleted",
		somethingHappenedWhileCreating: "Something happened while creating the event, please check the connections",
		somethingHappenedWhileUpdating: "Something happened while updating the event, please check the connections",
		success: "Event created successfully",
		updateSuccess: "Event updated successfully"
	},
	today: "Today",
	untitledEvent: "Untitled event"
};
var minimizableModals$1 = {
	calendarMeeting: "calendar meeting",
	email: "email",
	handleTemplate: "handle template",
	meeting: "meeting",
	note: "note",
	task: "task"
};
var misc$1 = {
	notifications: {
		loadMore: "Load more",
		markAllAsRead: "Mark all as read",
		noUpdates: "No updates to display",
		notifications: "Notifications",
		poweredByBloobirds: "Powered by <strong>Bloobirds</strong>",
		tabs: {
			calls: "Calls",
			emailTracking: "Email Tracking",
			inbound: "Inbound",
			updates: "Updates"
		}
	},
	activityNotFoundInBloobirds: "Activity not found in Bloobirds"
};
var notes$1 = {
	bobjectNote: "{{bobjectName}} notes",
	incomingCall: "Incoming call",
	newNote: "New note",
	outgoingCall: "Outgoing call",
	placeholder: "Start typing your new note...",
	save: "Save",
	saving: "Saving",
	titlePlaceholder: "New note: ",
	toasts: {
		errorCreating: "Error creating note",
		errorUpdating: "Error updating note",
		successCreating: "Note created succesfully!",
		successUpdating: "Note updated succesfully!"
	},
	untitledCompany: "Untitled company",
	untitledLead: "Untitled lead",
	untitledOpportunity: "Untitled opportunity"
};
var playbook$1 = {
	addLeadToActivityModal: {
		callout: "Register this number if you want future calls to be associated with this lead.",
		title: "Assign call to a lead",
		toast: {
			error: "There was a problem assigning the lead.",
			success: "Assigned lead successfully!"
		}
	},
	addNew: "Add new",
	addNewQQ: "Add Qualifying Questions",
	addNewTemplate: "Add new template",
	addToCalendarModal: {
		addToCalendar: "Add to calendar",
		header: "Book a 30-minute meeting in your calendar",
		untitled: "Untitled event"
	},
	allAssets: "All {{segmentationName}}s",
	andThisIsHowWeTranslateIt: "...and this is how we translate it to {{type}}",
	areYouSure: "Are you sure you want to continue?",
	buyerPersonaDefinition: "A buyer persona is a fictional representation of your ideal client or target audience! There are multiple Buyer personas within a target company. For example, our location intelligence software client has identified sales managers, trade marketing managers, and brand managers as their ideal buyers within FMCG target companies.",
	buyerPersonaExample: "Buyer Persona example",
	card: {
		battlecard: "Battlecard",
		edit: "Edit",
		insert: "Insert",
		officialTemplate: "Official template",
		send: "Send",
		shortcut: "Shortcut",
		use: "Use",
		view: "View",
		html: "HTML template"
	},
	customTasks: {
		addCustom: "Add custom task",
		addFields: "Add fields to custom task",
		cannotChangeIcon: "Cannot change the icon of a System Custom Task",
		cannotChangeTitle: "Cannot change the title of a System Custom Task",
		clickOnSearchBar: "Click on the search bar above to start searching.",
		fieldsRearrangementExplanation: "Once selected, you can drag, rearrange and delete any field as you wish.",
		fieldsToDisplay: "Available fields to display",
		fieldsToDisplayExplanation: "Search, find and delete any field for your custom tasks",
		fieldsToDisplayRequired: "You can also mark those each field as required",
		markRequired: "Mark as required",
		mustHaveDescription: "The task must have a description",
		mustHaveName: "The task must have a name.",
		noFieldsSelected: "🔍 No fields selected",
		placeholderDescription: "Briefly describe what the task is about",
		placeholderTitle: "Set your task type name",
		selectFieldsHere: "Select fields here to display data from them",
		showDisabled: "Show disabled task types",
		stillNoCustom: "Still no custom tasks have been created",
		taskDescriptionHeader: "Task description",
		taskExtraFieldsHeader: "Extra fields",
		taskReminder: "Is a reminder?",
		taskShouldCreateActivity: "Should create an activity?",
		taskIconAndNameHeader: "Task Icon and Name",
		taskStatusHeader: "Status",
		taskTypes: "Task types",
		taskTypesSubtitle: "Create custom task to keep log custom actions into Bloobirds",
		unmarkRequired: "Unmark as required"
	},
	deleteTargetMarketWarning: "You are going to delete permanently the Target Market &quot;{{name}}&quot;",
	emailTemplate: "Email template",
	emails: "Emails",
	guideTitle: "Guide to understand Business assets",
	handleTemplate: {
		accept: "Accept",
		cancel: "Cancel",
		confirmation: {
			saveExisting: "Save existing email template"
		},
		"delete": {
			text_one: "This template is being used in {{count}} cadence, if you want to delete it unlink the template from these cadences.",
			text_other: "This template is being used in {{count}} cadences, if you want to delete it unlink the template from these cadences.",
			title: "Delete",
			titleWithValue: "Delete {{value}}"
		},
		deleteTemplate: "Delete template",
		discard: {
			aboutToDelete: "You are about to delete a template.",
			changesNotSaved: "Changes won't be saved.",
			noUndone: "This action cannot be undone.",
			sure: "Are you sure you want to do this?",
			title: "Discard",
			titleWithValue: "Discard {{value}}"
		},
		discardChanges: "Discard changes",
		discardTemplate: "Discard template",
		edit: {
			text_one: "This template is being used in {{count}} cadence, this changes will be applied to all the auto-email tasks that are using this template and are already scheduled.",
			text_other: "This template is being used in {{count}} cadences, this changes will be applied to all the auto-email tasks that are using this template and are already scheduled."
		},
		save: "Save",
		saveTemplate: "Save template",
		toasts: {
			deleteSuccess: "Template deleted successfully!",
			nameAlreadyExists: "A template with the same name already exists, please try with a new one",
			nameRequired: "A name for the template is required",
			success: "Template saved successfully!"
		}
	},
	linkedin: "LinkedIn",
	linkedinTemplate: "LinkedIn template",
	nameFormEditor: {
		placeholder: "Template name...",
		requiredText: "A name for the template is required",
		title: "Title"
	},
	newBuyerPersona: "New Buyer Persona",
	newScenario: "New Scenario",
	newTargetMarket: "New Target Market",
	noBuyerPersonas: "No buyer personas for the following search",
	noPhoneNumber: "Set a phone number to use templates",
	noTargetMarkets: "No target markets for the following search",
	onlyOwner: "Only the Owner or an Admin can edit this template",
	permissions: "You don’t have permissions required to perform this action",
	pitchTemplate: "Pitch template",
	pitches: "Pitches",
	pitchesAndSnippets: "Pitches and Snippets",
	playbook: "Playbook",
	playbookTemplates: "Playbook templates",
	qqs: "QQs",
	qualifyingQuestions: {
		nonePlaceholder: "None",
		picklistSelect: "Select..."
	},
	scenarioDefinition: "Scenarios are different use cases for your solution depending on the current problem encountered daily by your client. Specifically, it’s their pain point, and your goal is to make them aware of both the hurt and thefix. Pain points are dependent on the maturity of the client company",
	searchTemplates: "Search templates",
	seeHowPersonasHelper: "See how setting up your playbook correctly can help you in your sales process! See some examples to inspire you, then click the Create Buyer Persona button to get started.",
	seeHowTargetsHelper: "See how setting up your playbook correctly can help you in your sales process! See some examples to inspire you, then click the Create Target Market button to get started.",
	seeSomeExamples: "See some examples",
	segmentationFilter: {
		all: "All",
		canChooseMoreThanOne: "Can choose more than one",
		categorization: "Categorization",
		categorizationText: "Categorizing enables you to easily filter your templates",
		officialPlaybook: "Official playbook template",
		onlyBattlecards: "Only battlecards",
		onlyMine: "Only mine",
		onlyOfficial: "Only official",
		onlyPrivate: "Only private",
		options: "Options",
		playbookBattlecard: "Playbook battlecard",
		prospect: "Prospect",
		prospectAndSalesStages: "Prospect and sales stage",
		prospectStage: "Prospect stage",
		sales: "Sales",
		salesStage: "Sales stage",
		segmentation: "Segmentation",
		segmentationAndFilters: "Segmentation and filters",
		stage: "Stage",
		visibleToAllMembers: "Visible for all team members",
		clearButton: "clear",
		selectedValue: "Select {{sectionName}}",
		multipleSelectedValues: "{{count}} values selected"
	},
	selectSegmentationCriteria: "Select segmentation criteria",
	selectedFilters: "{{count}} selected filter:",
	selectedFilters_other: "{{count}} selected filters:",
	snippetTemplate: "Snippet template",
	snippets: "Snippets",
	stillNoBuyerPersonas: "Still no buyer personas have been created",
	stillNoTargets: "Still no target markets have been created",
	subtitle: "Configure your playbook strategy by creating your business assets: target markets, buyer personas, scenarios and cadences",
	tabContent: {
		mySnippets: "My snippets",
		myTemplates: "My templates",
		noQQs: "No QQs created 💬",
		noQQsMessage: "Configured QQs will appear here",
		noResults: "We didn't find any matches for your search 🔍",
		noResultsHint: "Modify your search and try again",
		noTemplates: "No {{type}} templates {{icon}}",
		noTemplatesMessage: "Newly created {{type}} wil appear here",
		suggestedTemplates: "Suggested templates",
		teamTemplates: "Team templates",
		search: "Search..."
	},
	targetMarketDefinition: "A target market is a group of individuals sharing similar needs or characteristics that your solution can add value to. Identifying a target market helps your company develop effective sales and marketing strategies!",
	targetMarketsExample: "Target markets example",
	templateForm: {
		bodyPlaceholder: "Body",
		create: "Create",
		edit: "Edit",
		enterBodyPlaceholder: "Enter email body...",
		shortcutNamePlaceholder: "Shortcut name...",
		shortcutPlaceholder: "Shortcut...",
		shortcutTooltip: "To use a snippet, type “ / ” followed by the snippet name in the text editor, without spaces",
		subjectPlaceholder: "Subject",
		templateInformation: "Template information"
	},
	templateFormHeader: {
		author: "Author",
		battlecard: "Playbook battlecard",
		changeSegmentation: "Change segmentation",
		createdBy: "Created by",
		discardChanges: "Discard changes",
		discardTemplate: "Discard template",
		editTitle: "Edit {{type}}",
		goBack: "Go back",
		lastUpdatedBy: "Last updated by",
		metrics: {
			clickRate: "Click rate",
			openRate: "Open rate",
			replyRate: "Reply rate",
			timesDelivered: "Times delivered"
		},
		noStage: "⚠️ No stage",
		official: "Official Playbook Template",
		"private": "Private",
		prospecting: "Prospecting",
		prospectingAndSales: "Prospecting and sales",
		"public": "Public",
		sales: "Sales",
		save: "Save",
		saveNewTitle: "Save new {{type}}",
		userOnDate: "{{user}} on {{date}}"
	},
	templatesAndSnippets: "Templates & Snippets",
	thisIsABusinessModelExample: "This is a Business Model Example",
	title: "Business assets",
	untitledTemplate: "Untitled template",
	whatsapp: "WhatsApp",
	whatsappTemplate: "WhatsApp template"
};
var quickLogModal$1 = {
	cancel: "Cancel",
	create: "Create",
	"delete": "Delete",
	editTitle: "Log {{customTask}}",
	leadSelector: {
		none: "None",
		placeholder: "Lead Associated {{required}}",
		required: "This field is required"
	},
	logTitle: "Log {{customTask}}",
	save: "Save",
	toasts: {
		successLog: "You’ve successfully logged the activity {{name}}",
		successUpdate: "You’ve successfully updated the activity {{name}}"
	}
};
var quickStartGuide$1 = {
	oto: {
		blocks: {
			language: {
				title: "Choose your language",
				subtitle: "You can change your language in your user settings anytime you want.",
				skipButtonText: "Continue with default language"
			},
			email: {
				title: "Connect your email",
				titleSignature: "Configure your email",
				skipButtonText: "Continue without email",
				skipButtonTextSignature: "Continue without signature",
				content: {
					addCheck: "Add my signature at the bottom when I compose emails",
					changeCheck: "Enable change signature when I compose emails",
					tracking: {
						title: "Email tracking notifications",
						notifyCheck: "Notify me when a lead opens, clicks or replies my emails"
					}
				}
			},
			sfdc: {
				addedTime: "Added {{dateDistance}}",
				connectToSfdc: "Connect to SFDC",
				subtitle: "<0>Are you testing?</0> <1>Connect a sandbox account instead</1>",
				title: "Connect your Salesforce account",
				skipButtonText: "Continue without Salesforce"
			},
			start: {
				completeSteps: "Complete all steps to install the extension",
				installBloobirds: "Install Bloobirds",
				title: "Start using Bloobirds",
				tooltip: "You must complete all steps to start"
			},
			timezone: {
				accept: "Accept",
				myTimezone: "My timezone",
				title: "Set your timezone",
				skipButtonText: "Continue without timezone",
				toasts: {
					error: "There was an error saving your personal settings!",
					success: "Your settings have been updated!"
				}
			},
			dialer: {
				title: "Choose your dialer",
				skipButtonText: "Continue without dialer",
				content: {
					disabledTooltip: "Your user does not have an {{dialerName}} user mapped, ask your admin to assign one!",
					logCallsManually: {
						title: "Do you want to be able to log calls manually from the dialer?",
						checkbox: "Enable call log view manually"
					},
					changePhoneManually: {
						title: "Automatically change the user’s phone to one that matches the lead’s phone extension if available",
						checkbox: "Auto-change phone extension"
					},
					syncContactsAircall: "Sync your contacts from Bloobirds to Aircall"
				}
			},
			taskAndReminders: {
				title: "Task and reminders",
				skipButtonText: "Continue without reminders",
				content: {
					enableReminders: "Enable task reminders",
					selectorPlaceholder: "Time before to be notified",
					autoComplete: "Auto complete your Cadence and Scheduled tasks when doing an attempt",
					options: {
						"1": "1 minute",
						"5": "5 minutes",
						"10": "10 minutes",
						"20": "20 minutes",
						"30": "30 minutes",
						"60": "1 hour",
						"120": "2 hours"
					},
					toasts: {
						error: "There was an error saving your reminder settings!"
					}
				}
			}
		},
		subtitle: "Start selling in less than <strong>1 minute! </strong>",
		title: "On top of essentials 🚀",
		progressText: "All tasks completed"
	}
};
var richTextEditor$1 = {
	meetingLinks: {
		add: "Add",
		alertMessage: "If the sender has not defined or deletes a Meeting Link, the email will not be sent.",
		linkTo: "Link to",
		meetingLink: "Meeting Link",
		myMeetingLinks: "My meeting links",
		noMeetingLinks: "No meeting links created for this user",
		otherMeetingLinks: "Other user's meeting links",
		placeholder: "Text to display *",
		required: "This field is required",
		sendersMeetingLinks: "Sender's meeting link",
		specificUsersMeetingLinks: "Specific user's meeting links",
		title: "Meeting Link",
		user: "User",
		you: "You"
	},
	missingMeetingLink: "User has no default meeting link or this link has been erased",
	saveSnippet: "Save snippet",
	sizes: {
		huge: "Huge",
		large: "Large",
		medium: "Medium",
		small: "Small"
	},
	toasts: {
		sizerError: "File exceeds maximum allowed size of 15MB",
		uploadAttachmentError: "Failed to upload attachment"
	},
	variableNotFound: "Variable could not be found",
	variables: {
		company: "Company",
		lead: "Lead",
		opportunity: "Opportunity",
		sdr: "Sdr"
	}
};
var scheduler$1 = {
	addGuests: "Add guests",
	allSlotsBooked: "All slots have been booked for the day",
	chooseDate: "Choose a date",
	confirmation: {
		invitationSent: "An invitation has been sent to all email addresses",
		subtitle: "You’ve scheduled a meet with",
		title: "Fantastic 🎉"
	},
	"continue": "Continue",
	email: "Email",
	error: "Something went wrong",
	errorPageInfo: "Try to see if the link copied was not modified.<br/>If the problem persist check with the email sender directly.",
	errorPageInfoTitle: "Unable to show the available slots",
	expired: {
		subtitle: "Please, ask the person who sent you this link for another",
		title: "The link you clicked has expired!"
	},
	guests: {
		emailAlreadyAdded: "This email has already been added",
		fieldRequired: "This field is required",
		invalidEmailError: "Invalid email address",
		invalidEmailTooltip: "This email is not valid",
		invalidEmailsError: "There is an invalid email",
		noEditInfo: "Invitees cannot be edited once the meeting is booked",
		numberEmails: "Up to 10 additional emails",
		numberEmailsError: "You can only add up to 10 guests",
		placeholder: "Type an email and press enter to add it to the list"
	},
	meetingDetails: "Meeting details",
	minsMeeting_one: "{{count}} min meeting",
	minsMeeting_other: "{{count}} mins meeting",
	mins_one: "{{count}} min",
	mins_other: "{{count}} mins",
	name: "Name",
	noAvailableSlot: "This slot is not available anymore.",
	note: "Meeting note",
	poweredByBloobirds: "Powered by Bloobirds",
	scheduleMeeting: "Schedule meeting"
};
var sidePeek$1 = {
	bobjectBriefCard: {
		closes: "Closes",
		note: "Note",
		onCadence: "On cadence",
		untitledCompany: "Untitled company"
	},
	captureForm: {
		saveLeadAndCompany: "+ SAVE LEAD AND COMPANY",
		saveLeadToCompany: "+ SAVE LEAD TO COMPANY",
		saveLeadWithoutCompany: "+ SAVE LEAD WITHOUT COMPANY"
	},
	captureLinkFailed: {
		errorDescription: "The LinkedIn URL from this page could not be copied. Please click the button below to try again",
		retryAutomatically: "Retry automatically",
		title: "Failed to copy LinkedIn URL"
	},
	companyBriefHeader: {
		untitledCompany: "Untitled company"
	},
	contactRelatedCompanies: {
		addChildCompanies: "Add child companies",
		addChildCompany: "Add a child company",
		addParentCompany: "Add a parent company",
		addParentOrChildCompany: "Add a parent or child company to track the organizational structure of",
		addRelatedCompany: "Add a related company",
		asParentCompany: "as your parent company?",
		child: "child",
		childCompanies: "Child companies",
		childCompany: "Child company",
		company: "company",
		confirmSetAndRemoveCompany: "This will <strong>remove</strong> previous relationships with other companies",
		confirmSetCompany: "Do you want to set",
		discardChanges: "Discard changes",
		editChildCompanies: "Edit child companies",
		editCompanies: "Edit companies",
		existingRelatedCompany: "It seems <strong>you already have a parent company </strong> set up. If you continue with this process, you will remove that relationship with the company.",
		goingToRemove: "You are about to remove",
		goingToRemoveConfirm: "as your parent company. Are you sure you want to do this?",
		parent: "parent",
		parentCompany: "Parent company",
		remove: "Remove",
		removeRelationships: "Remove relationships",
		replace: "Replace",
		replaceRelationships: "Replace company",
		saveChanges: "Save changes",
		searchAndSelect: "Search and select a",
		searchByName: "Search companies by name.",
		selectTypeCompany: "Select what type of company you want to add",
		siblingCompanies: "Sibling Companies"
	},
	contactViewActions: {
		buyerPersona: "Buyer persona",
		contactButtons: {
			goToHubspot: "Go to Hubspot record",
			goToSFDC: "Go to Salesforce record",
			noPermissions: "You don’t have permissions required to perform this action",
			openInBB: "Open in Bloobirds",
			openInLinkedIn: "Open {{bobjectType}} on LinkedIn",
			openMainNote: "Open main note",
			searchInLinkedIn: "Search {{bobjectType}} on LinkedIn",
			similarWonDeals: "Similar won deals"
		},
		contactDetails: "Contact details",
		logCallManually: "Log call manually",
		openDialer: "Open dialer",
		callManually: "Call manually",
		mainNote: "Main note",
		"new": "New",
		newEmail: "New email",
		noPermissionsToPerformAction: "You don’t have permissions required to perform this action",
		noPhoneNumbers: "No phone numbers",
		noteMessage: "Do you want to open the main note or create a new one?",
		quickLog: "Quick log",
		quickLogCustomTask: {
			addNewCustomTasks: "Add new custom tasks",
			askYourManager: "Ask your manager to create a custom task type",
			configureCustomTasks: "Configure custom tasks",
			missingSome: "Missing some custom activity to log?",
			noCustomTasksCreated: "There are no custom tasks created or enabled. In order to select this step make sure to have at least one custom type available.",
			sectionTitle: "Log quick activity with one click",
			tooltip: "Quick activity log"
		},
		targetMarket: "Target market"
	},
	duplicates: {
		duplicatedLead: "There's a duplicated lead",
		existingLead: "The existing lead ",
		fieldName: "has the same {{fieldName}}",
		mergeExisting: "Merge with existing lead",
		sameField: "The lead has the same {{fieldName}}"
	},
	duplicatesLayout: {
		createNewLead: "Create new lead",
		noResults: "No results for {{searchValue}} ",
		possibleMatches: "{{count}} possible match{{count > 1 ? 'es' : ''}} for this lead in Bloobirds. <br /><b>Is it one of them?</b>",
		possibleMatches_one: "{{count}} possible match for this {{bobjectType}} in Bloobirds. <strong>Is it one of them?</strong>",
		possibleMatches_other: "{{count}} possible matches for this {{bobjectType}} in Bloobirds. <strong>Is it one of them?</strong>",
		searchOnDB: "Search on the Bloobirds data base",
		tryOtherTerms: "Try other search terms"
	},
	leadPage: {
		optedOut: "This person has been opted out by requesting not to be contacted again.",
		stageProspecting: "Stage: Prospecting",
		stageSales: "Stage: Sales",
		viewLeadInBB: "View lead in Bloobirds"
	},
	multipleCompaniesPage: {
		footerButtonText: "None of these? Create new"
	},
	multipleLeadsPage: {
		createNewLead: "Create new lead",
		createNewLeadDisabled: "Synchronize",
		footerInfo: {
			description: "Create a new one👇",
			title: "None of these leads"
		},
		footerLinkedin: {
			description: "Create it here👇",
			title: "Can’t find it?"
		},
		footerDisabledObjectCreation: {
			description: "Sync {{leadName}} to Bloobirds",
			title: "None of these leads"
		},
		noResultsFound: "No results for '{{searchValue}}'",
		otherSearchItem: "Try other search terms",
		searchInDatabase: "Search for people",
		titleInfo: " The phone number of this person <0/> is not listed on any contact. <strong>Search on your data base or create new one</strong>",
		titleLinkedin_one: "{{count}} possible match for this lead in Bloobirds. <strong>Is it one of them?</strong>",
		titleLinkedin_other: "{{count}} possible matches for this lead in Bloobirds. <strong>Is it one of them?</strong>"
	},
	navigateToProfileScreen: {
		captureInfo: "We can only capture the information of leads when you are viewing their profile.",
		tryProfile: "Try navigating to a profile.",
		viewExample: "VIEW EXAMPLE"
	},
	noContextPage: {
		currentTask: "Current task",
		extraMile: "Go the extra mile 😎",
		searchPlaceholder: "Search here or use {{commandText}} to open",
		stayOnTop: "Stay on top of Salesforce while working effortlessly with Bloobirds and its contactability tools"
	},
	noObjectsPage: {
		addParentCompany: "Add parent company",
		addRelationship: "Add relationship",
		noCompanyFound: "No company found",
		noCompanyRelatedFound: "No company relationships found",
		noLeadFound: "No leads found",
		noOppFound: "No opportunities found"
	},
	opportunityBriefCard: {
		closes: "Closes"
	},
	overview: {
		activity: {
			attempts_one: "{{count}} attempt",
			attempts_other: "{{count}} attempts",
			lastActivity: "Last activity",
			lastAttempt: "Last attempt",
			lastTouch: "Last touch",
			touches_one: "{{count}} touch",
			touches_other: "{{count}} touches",
			viewAll: "View all"
		},
		lastActivity: {
			noActivity: "No activity registered yet 🏝️",
			noActivitySubtitle: "Here you will see the latest contact activity done",
			since: "Since last contact",
			lastContact: "Last contact activity"
		},
		contacts_one: "{{count}} contact",
		contacts_other: "{{count}} contacts",
		createAs: "Create as {{bobject}}",
		createInSalesforce: "Create in Salesforce",
		fields: {
			addFields: "Add field to display",
			dataFrom: "Data from",
			noFieldsSelected: "🔍 No fields selected",
			noSfdcFields: "No info from Salesforce available",
			searchHint: "Click on the search bar above to start searching. Once selected, you can drag, rearrange and delete any field as you wish."
		},
		leads: "Leads",
		noBobjectInThisBobject: "No {{bobject1}} in this {{bobject2}}",
		notSynced: "Not synced",
		relatedBobject: "Related {{bobject}}",
		relatedBobjectOpp: "Related {{bobject}}",
		selectAll: "Select all",
		sync: "Sync",
		syncInBloobirds: "Sync in Bloobirds",
		task: {
			createNewTask: "Create new task",
			noPendingTask: "No pending tasks",
			noPermissionsTooltip: "You don’t have permissions required to perform this action",
			noResultPageDescription: "Looks like everything is done!"
		},
		toasts: {
			cadenceTasksAdded: "Cadence tasks are now visible in the Today tasks section.",
			cadenceTasksDeleted: "Cadence tasks have been deleted successfully",
			contactSyncedError: "There was an error syncing your Contact, please try again",
			contactSyncedSuccess: "Contact successfully synced",
			createBobjectInSfdcError: "There was an error syncing {{bobject}} to Salesforce {{message}}",
			createBobjectInSfdcSuccess: "{{bobject}} synced to Salesforce successfully!"
		},
		tooltips: {
			youCannotSelectOtherSource: "You cannot select another source. Please set up an integration to do so"
		},
		wizardHelper: {
			allTasks: "All tasks",
			clickToViewFutureTasks: "Click on <strong>All tasks</strong> to view all future to do tasks",
			managingTasks: "Managing tasks...",
			nextStepSuggested: "Next step suggested",
			noTasksForToday: "No tasks for today 🌴",
			onCadence: "On cadence",
			setCadence: "Set cadence",
			startCadence: "Start cadence",
			todayTasks: "Today tasks"
		}
	},
	relationObjects: {
		noResults: {
			description: "To view related objects in this section, configure the settings <0>here</0>",
			title: "No related objects"
		}
	},
	salesNavUpgrade: {
		needToUpgrade: "It seems you need to upgrade your Sales Navigator account to be able to see this profile.",
		title: "Upgrade Sales Navigator"
	},
	settings: {
		captureLead: {
			assignToMe: "Assign new leads to me",
			autoSync: "Auto sync",
			autoSyncDescription: "Auto sync Leads, Contacts, Accounts and Opportunities from Salesforce each time I enter in their Salesforce page",
			autoSyncSalesforce: "Auto sync from Salesforce",
			autoHideLeftBarSetting: "Auto hide left bar",
			autoHideLeftBarSettingCheckbox: "Auto hide left bar on Salesforce",
			autoHideLeftBarSettingDescription: "Automatically hide left bar when navigating through Salesforce using left bar cards",
			showOpportunityInWhatsapp: "Show lead opportunities in WhatsApp",
			showOpportunityInWhatsappCheckbox: "Auto show opportunities in WhatsApp",
			showOpportunityInWhatsappDescription: "Automatically show lead opportunities when navigating through WhatsApp",
			connectSalesforceButton: "Connect Salesforce",
			connectionSuccessful: "You are successfully connected with Salesforce!",
			description: "By default, new leads will be assigned to you. Uncheck the option to set them as \"Unassigned\".",
			salesforceConnection: "Salesforce Connection"
		}
	},
	stageAndStatusLabel: {
		defaultStatus: "New",
		statusUpdatedSuccessfully: "Status updated successfully"
	},
	syncMessageInfo: {
		messagesSynced: "Messages with this lead are synced to Bloobirds",
		messagesSyncedInfo: "Your complete history of calls, emails, and LinkedIn messages with this lead, is available in Bloobirds.",
		syncMessages: " Do you want to synchronise the messages of this lead?",
		syncMessagesDescription: "Messages with this lead cannot be synced to Bloobirds. To enable sync please visit the leads' Sales Navigator profile and try to capture it.",
		viewInBloobirds: "VIEW LEAD IN BLOOBIRDS",
		viewProfileButton: "VIEW PROFILE TO SYNC"
	},
	syncSalesforceList: {
		syncListInfo: {
			callout: "Only {{type}} that do not currently exist and have been assigned to a specific mapped user will be synchronized with Bloobirds.",
			checkBoxTextAccounts: "Create companies when syncing {{type}} without an existing one",
			checkBoxTextContacts: "Create associated contacts when syncing an {{type}}.",
			shouldCreateAccountsText: "When a new {{type}}} is synchronized, and it has an related account that does not exist in Bloobirds, a company will be automatically created in the system.",
			shouldCreateContactsText: "When a new {{type}} is synchronized, all its related contacts will be synchronized as well.",
			titleAccounts: "Related accounts",
			titleContacts: "Related accounts"
		},
		syncListModal: {
			bulkMessages: {
				starting: "Starting list bulk action...",
				synchronizeAll: "You are about to synchronize the whole list. It contains {{count}} {{type}}",
				synchronizeItems: "You are about to synchronize the selected {{count}} {{type}}"
			},
			contentDownBlock: "we are unable to send these types of objects to Bloobirds via a list. Currently, we only support syncing leads, contacts, accounts, and opportunities from Salesforce lists.",
			contentUpperBlock: "You are attempting to synchronize objects of the type '{{type}}'. Unfortunately,",
			goBack: "Go back",
			noResults: "There are no {{type}} in this list. Change the filters and try to synchronize a list with objects.",
			noSelected: "There are no objects selected, do you want to synchronize all the objects of the list (this will use all the items of the list and not only the ones that are visible on the page)",
			recentSubtitle: "Unfortunately, we are unable to synchronize the whole list unless you select some items from it. Try to select some items first or change the list.",
			recentTitle: "You are attempting to synchronize objects from a recently viewed list.",
			sync: "SYNC",
			syncWholeList: "SYNC WHOLE LIST",
			title: "Synchronize Salesforce {{type}} to Bloobirds",
			toasts: {
				error: "There was an error syncing your {{type}}. Please try again later!",
				success: "Your {{type}}s are being synced!"
			}
		}
	},
	task: {
		createNewTask: "Create new task",
		noPendingTask: "No pending tasks",
		noPermissionsTooltip: "You don’t have permissions required to perform this action",
		noResultPageDescription: "Looks like everything is done!"
	},
	updateLeadWindow: {
		title: "The lead has been updated",
		viewInBloobirds: "View lead in bloobirds",
		viewInBloobirdsQuestion: "Do you want to view the lead in Bloobirds?"
	},
	whatsappDuplicates: {
		callout: "We recommend editing the contacts and keeping only <strong>one phone number for each person.</strong>",
		headerText: "The phone number of this person is listed on several existing contacts.",
		headerTextOpportunities: "The phone number of this person is listed on several existing opportunities.",
		titleText: "Please select the correct one"
	}
};
var smartEmailModal$1 = {
	components: {
		cancelEmailModal: {
			back: "Back",
			cancelEmail: "Cancel email",
			subtitle: "This action cannot be undone, are you sure you want to continue?",
			title: "You are about to cancel this email, this action will delete the task and the email won't be sent.",
			titleBulk_one: "You are about to cancel {{count}} email, this action will delete the tasks and the emails won't be sent.",
			titleBulk_other: "You are about to cancel {{count}} emails, this action will delete the tasks and the emails won't be sent.",
			toasts: {
				error: "There was an error deleting the email, please try again!",
				success: "Email has been successfully cancelled"
			}
		},
		confirmSendModal: {
			cancel: "Cancel",
			content: "There are <strong>unsaved changes</strong>, if you wish to send the email, the task will <strong>not be created. Do you want to continue?</strong>",
			sendEmail: "Send email",
			title: "Unsaved changes"
		},
		messagingTemplatesButton: {
			noTemplateSelected: "No template selected",
			openTemplates: "Open templates",
			template: "Template"
		},
		noDataPage: {
			subtitle: "It seems that there are no results for the criteria you have specified",
			title: " No {{objectName}} could be found"
		},
		noResultsPage: {
			subtitle: "Activites with the selected leads will be shown here",
			title: "No activities registered yet"
		},
		previewActivityModal: {
			title: "Preview email"
		},
		recipientSearchInput: {
			header: {
				allRelatedEmailsHaveBeenAdded: "All related emails have been added. Search globally to add more",
				cannotSearchEmailsInCopmany: "Cannot search emails in the Company if there’s no valid email selected",
				coworkersEmails: "Coworker's emails",
				currentEmailDoesNotHaveCompany: "Current email does not have a Company. Search globally to add new emails",
				searchEverywhere: "Search everywhere",
				searchInCompany: "Search in Company"
			},
			noContactsWithSearchTerm: "No results match your search criteria",
			noContactsWithoutSearchTerm: "Type something to display a list of results",
			notRegisteredTooltip: "This email is not registered to any object in Bloobirds. Create it now to register your activity.",
			outsiderTooltip: "Be cautious about sharing sensitive information. {{email}} is outside the original thread organisation.",
			selectableItemTooltip: "Be cautious about sharing sensitive information, isabelgaperez@soylandsl.es is outside the original thread organisation."
		},
		saveWithNoSlotsModal: {
			backAndEdit: "Back and edit",
			"continue": "Continue without slots",
			modalContentText: "You <strong>cannot save a template with time slots</strong> because the links will <strong>expire</strong>. By clicking on continue, you’ll remove the time slots from the email body and save the template.",
			saveTemplate: "Save template"
		},
		scheduleEmailModal: {
			africa: "Africa",
			america: "America",
			antarctica: "Antarctica",
			asia: "Asia",
			australia: "Australia",
			cancel: "Cancel",
			companyTimezone: "Company Timezone",
			dateTimeFromSelectedTimezone: "Date and time from selected timezone",
			europe: "Europe",
			leadTimezone: "Lead Timezone",
			myTimezone: "My Timezone",
			selectDateAndTime: "Select date and time",
			send: "Send",
			title: "Schedule send",
			today: "Today",
			tomorrowAfternoon: "Tomorrow afternoon",
			tomorrowMorning: "Tomorrow morning",
			tooltip: "Can't reschedule a task to a past date"
		},
		sendEmailModal: {
			back: "Back",
			bulk: "You are going to try and send or resend ##EMAILS_NUMBER## emails. Be sure to check the contents are correct before sending them",
			cannotBeUndonde: "<strong>This action cannot be undone</strong>, are you sure you want to continue?",
			retry: "You are going to try and send this email again. Be sure to check the contents are correct before sending it.",
			retrySend: "Retry Send Email",
			send: "You are about to send an email. Be sure to check the contents are correct before sending it.",
			sendButton_one: "Send email",
			sendButton_other: "Send emails",
			sendEmail: "Send email",
			toasts: {
				delay: "Email had a short delay 😞 Please check if it was sent correctly",
				error: "Something went wrong while trying to send the email. Please check the task details and try again later",
				success: "Emails has been succesfully sent"
			}
		}
	},
	createLeadTab: {
		changeFromField: "Change form fields in Bloobirds",
		createLead: "Create lead",
		discard: "Discard",
		missingInfo: "Do you miss any information here?",
		newLead: "New lead",
		toasts: {
			success: "New lead created"
		}
	},
	createTaskTab: {
		assignedTo: "Assigned to",
		createTask: "Create task",
		descriptionPlaceholder: "Type your task description...",
		discard: "Discard",
		dueDate: "Due date",
		newTask: "New task",
		object: "Object",
		toasts: {
			success: "Task created successfully"
		}
	},
	newEmail: "New email",
	untitledMeeting: "Untitled meeting",
	pastActivityTab: {
		activities: "Activities",
		title: "Past activity"
	},
	playbookTab: {
		header: {
			back: "Back",
			deleteTemplate: "Delete template",
			editTemplate: "Edit template",
			insert: "Insert",
			insertTemplate: "Insert template",
			use: "Use",
			userCantEdit: "Only the Owner or an Admin can delete this template"
		}
	},
	previewTab: {
		banner: {
			error: "Fix variables in order to send the email.",
			standard: "Preview of the email once it has been sent"
		}
	},
	similarDealsTab: {
		datePlaceholder: "Select time range",
		deals: "Deals",
		infoBanner: {
			checkBox: "Don't show this again",
			content: "Similar Won Deals is a <strong>powerful data tool</strong>. It shows you past prospects that share the same scenario with the current one. That brings us to the question: <strong>Why are you using different solutions for the same pain point?</strong> Discover how this powerful tool can help you.",
			learnMore: "Learn more",
			title: "You've been here before"
		},
		matchesInSame: " Matches in same:",
		noDeals: {
			subtitle: "Try to change your search to get results",
			title: "No deals with the same criteria"
		},
		title: "Similar won deals"
	},
	tabs: {
		calendarTab: "Calendar",
		createLeadTab: "Create lead",
		createTaskTab: "New task",
		pastActivityTab: "Past activity",
		previewTab: "Preview",
		similarWonDealsTab: "Similar won deals",
		suggestionsTab: "Suggestions",
		templatesTab: "Templates & Snippets"
	}
};
var tasks$1 = {
	newTask: "New task: ",
	taskForm: {
		addTask: "Add task",
		assignedTo: "Assigned to",
		deleteTask: "Delete task",
		dueDate: "Due date",
		placeholder: "Describe your task... ",
		saveTask: "Save task"
	},
	taskTypeSelector: {
		addNew: "Add new tasks types",
		askYourManager: "Ask your manager to create a new task type",
		call: "Call",
		email: "Email",
		missingTask: "Missing a type of task?",
		task: "Task",
		taskTypes: "Task types"
	},
	toasts: {
		bulkCompletedSuccess_one: "{{count}} task completed successfully.",
		bulkCompletedSuccess_other: "{{count}} tasks completed successfully.",
		completedSuccess: "Task completed succesfully!",
		deleteSuccess: "Task deleted succesfully!",
		success: "Task created succesfully!",
		updateSuccess: "Task updated succesfully!"
	}
};
var taskFeed$1 = {
	noTasks: "All tasks done 🌴 ",
	noTasksHint: "Take a break or change filters to display more",
	loadMoreTasks: "Load more",
	closeTasks: "Close tasks",
	reminders: "Reminders",
	completedTasks: "Completed",
	scheduledTasks: "Scheduled",
	dailyTasks: "Daily",
	overdueTasks: "Overdue",
	markClusterDone: "Mark as done",
	clusterMarkedAsDone: "Cluster marked as done successfully",
	reload: "Tasks reloaded successfully",
	reloadTooltip: "Reload tasks",
	confirmMarkAsDoneModal: {
		title: "Mark all as done",
		description: "Are you sure you want to mark all selected tasks as done?",
		cancel: "Cancel",
		confirm: "Confirm"
	}
};
var templateSelector$1 = {
	login: "Login",
	loginMessage: "Login on the extension to see your templates",
	myTemplates: "My templates",
	noResults: {
		addTemplate: "+ Add template",
		noResultsFound: "No results found"
	},
	permissions: "You don’t have permissions required to perform this action",
	playbookRecommendations: {
		info: "If the lead is on Bloobirds, here you'll see your recommendations based on your Playbook segmentation",
		title: "Playbook recommendations"
	},
	suggestedTemplates: {
		info: "If the lead is on Bloobirds, here you'll see your recommendations based on your Playbook segmentation",
		title: "Suggested templates"
	},
	resync: {
		resync: "Resync",
		tooltip: "Missing messages in Bloobirds? Click to resync the conversation"
	},
	search: "Search...",
	teamTemplates: "Team templates",
	tooltipWithLead: "{{lead}} exists in Bloobirds, variables will be automatically replaced",
	tooltipWithoutLead: "Lead was not found in Bloobirds, we will try to replace variables based on Linkedin information"
};
var tooltips$1 = {
	customTasksDT: {
		description: "WhatsApp messages, LinkedIn invites, in-person meetings... If it's in your sales process, then it can be in Bloobirds too. ",
		title: "Start logging custom activities now!"
	},
	gotIt: "Got it!",
	homePageTooltip: {
		description: "Contact details in a company-based view, full activity history, contactability tools, custom content...",
		title: "The Bubble 🫧 : The proactive help you need."
	},
	inviteesDT: {
		description: "Now you can remove yourself from being an invitee of the meeting, also add more internal and external invitees and all this synchronised in your calendar account. ✨",
		title: "You can sync your invitees!"
	},
	knowMore: "Know more",
	watchNow: "Watch now",
	watchVideo: "Watch video",
	slotsTooltip: {
		footer: "Share your available time so your contacts will know when you’re up for a meeting. And they can also book it in advance! ✨ ",
		title: "Tell your contacts when you’re free to meet 📆",
		ok: "Ok",
		buttonText: "Learn More"
	},
	blankPageTooltip: {
		description: "You can attach now an email template to a cadence task with an email. Don’t face a blank page when doing everyday tasks ✨",
		title: "Kiss blank page anxiety goodbye 👋 "
	},
	contactsTooltip: {
		extensionName: "Bloobirds Chrome Extension",
		navigateToProfile: "Navigate to a contact profile to see the bubble in action!"
	},
	handleTemplate: {
		save: "Save",
		cancel: "Cancel",
		accept: "Accept",
		discardChanges: "Discard changes",
		discardTemplate: "Discard template",
		deleteTemplate: "Delete template",
		saveTemplate: "Save template",
		toasts: {
			nameRequired: "A name for the template is required",
			success: "Template saved successfully!",
			deleteSuccess: "Template deleted successfully!",
			nameAlreadyExists: "A template with the same name already exists, please try with a new one"
		},
		confirmation: {
			saveExisting: "Save existing email template"
		},
		"delete": {
			title: "Delete",
			titleWithValue: "Delete {{value}}",
			text_one: "This template is being used in {{count}} cadence, if you want to delete it unlink the template from these cadences.",
			text_other: "This template is being used in {{count}} cadences, if you want to delete it unlink the template from these cadences."
		},
		edit: {
			text_one: "This template is being used in {{count}} cadence, this changes will be applied to all the auto-email tasks that are using this template and are already scheduled.",
			text_other: "This template is being used in {{count}} cadences, this changes will be applied to all the auto-email tasks that are using this template and are already scheduled."
		},
		discard: {
			title: "Discard",
			titleWithValue: "Discard {{value}}",
			changesNotSaved: "Changes won't be saved.",
			aboutToDelete: "You are about to delete a template.",
			noUndone: "This action cannot be undone.",
			sure: "Are you sure you want to do this?"
		}
	},
	tabContent: {
		suggestedTemplates: "Suggested templates",
		search: "Search...",
		myTemplates: "My templates",
		mySnippets: "My snippets",
		teamTemplates: "Team templates",
		noResults: "We didn't find any matches for your search 🔍",
		noResultsHint: "Modify your search and try again",
		noTemplates: "No {{type}} templates {{icon}}",
		noTemplatesMessage: "Newly created {{type}} wil appear here",
		noQQs: "No QQs created 💬",
		noQQsMessage: "Configured QQs will appear here"
	},
	addLeadToActivityModal: {
		title: "Assign call to a lead",
		callout: "Register this number if you want future calls to be associated with this lead.",
		toast: {
			success: "Assigned lead successfully!",
			error: "There was a problem assigning the lead."
		}
	},
	addToCalendarModal: {
		untitled: "Untitled event",
		header: "Book a 30-minute meeting in your calendar",
		addToCalendar: "Add to calendar"
	},
	segmentationFilter: {
		segmentationAndFilters: "Segmentation and filters",
		segmentation: "Segmentation",
		onlyMine: "Only mine",
		onlyPrivate: "Only private",
		onlyOfficial: "Only official",
		onlyBattlecards: "Only battlecards",
		stage: "Stage",
		all: "All",
		prospect: "Prospect",
		sales: "Sales",
		prospectAndSalesStages: "Prospect and sales stage",
		prospectStage: "Prospect stage",
		salesStage: "Sales stage",
		options: "Options",
		canChooseMoreThanOne: "Can choose more than one",
		visibleToAllMembers: "Visible for all team members",
		playbookBattlecard: "Playbook battlecard",
		officialPlaybook: "Official playbook template",
		categorization: "Categorization",
		categorizationText: "Categorizing enables you to easily filter your templates"
	},
	templateFormHeader: {
		discardChanges: "Discard changes",
		discardTemplate: "Discard template",
		save: "Save",
		goBack: "Go back",
		editTitle: "Edit {{type}}",
		saveNewTitle: "Save new {{type}}",
		changeSegmentation: "Change segmentation",
		"public": "Public",
		"private": "Private",
		battlecard: "Playbook battlecard",
		official: "Official Playbook Template",
		createdBy: "Created by",
		lastUpdatedBy: "Last updated by",
		userOnDate: "{{user}} on {{date}}",
		author: "Author",
		metrics: {
			openRate: "Open rate",
			clickRate: "Click rate",
			replyRate: "Reply rate",
			timesDelivered: "Times delivered"
		},
		prospecting: "Prospecting",
		sales: "Sales",
		prospectingAndSales: "Prospecting and sales",
		noStage: "⚠️ No stage"
	},
	nameFormEditor: {
		title: "Title",
		placeholder: "Template name...",
		requiredText: "A name for the template is required"
	},
	templateForm: {
		subjectPlaceholder: "Subject",
		shortcutTooltip: "To use a snippet, type “ / ” followed by the snippet name in the text editor, without spaces",
		shortcutPlaceholder: "Shortcut...",
		shortcutNamePlaceholder: "Shortcut name...",
		bodyPlaceholder: "Body",
		enterBodyPlaceholder: "Enter email body...",
		edit: "Edit",
		create: "Create",
		templateInformation: "Template information"
	},
	ok: "Ok"
};
var dialer$1 = {
	dialer: "Dialer",
	logCall: {
		button: "Log call",
		title: "Log call",
		toast: {
			success: "Call was successfully logged!"
		}
	},
	extendedScreen: {
		autoOpen: "Auto-open when starting a call",
		onlyAdminCanEditTemplate: "Only the Owner or an Admin can edit this template",
		note: "Call notes"
	},
	logCallModal: {
		title: "Log manual Call",
		date: "Call date",
		yourPhoneNumber: "Your phone number",
		phoneNumber: "Phone number"
	},
	yourPhoneNumber: "Your phone number",
	addNote: "Add note",
	direction: {
		title: "Call direction",
		incoming: "Incoming",
		outgoing: "Outgoing"
	},
	note: "Note",
	notePlaceholder: "Start typing your new note...",
	pitch: "Pitch",
	dial: {
		mainNumber: "Main number",
		emptySearch_a: "We did not find any matches for your search 🔍",
		emptySearch_b: "Please try again with a different name or phone",
		action: "Input a number or search for companies or leads...",
		setAPhone: "Set a phone account to enable calling feature",
		noMatch: "Number does not match any company or lead"
	},
	hints: {
		noConfig: "You cannot call because your account is not set up.",
		logManually: "You always can log calls manually.",
		help: "Learn how to start calling with Bloobirds.",
		onlyAdmins: "Only admins can set up the account.",
		unstableConnection: "Unstable connection...",
		connectionError: "Connection error",
		buildingDialer: "Building the dialer...",
		readyToCall: "Ready to call",
		connecting: "Connecting...",
		ringing: "Ringing...",
		callInProgress: "Call in progress",
		reconnecting: "Trying to reconnect...",
		callEnded: "Call ended",
		incomingCall: "Incoming call",
		make: "Make a call",
		onCall: "On Call",
		connectionProblems: "Having connection problems? Check the dialer setup.",
		invalidToken: "Invalid token",
		invalidToken_explanation: "The dialer is not properly configured or the account is invalid"
	},
	tooltips: {
		cannotClose: "You cannot close the dialer while you are on a call.",
		close: "Close dialer",
		minimize: "Minimize dialer"
	}
};
var validation$1 = {
	email: "This is not a valid email"
};
var welcomeScreens$1 = {
	otoSlides: {
		commonScreen: {
			animationText: "Bloobirds transforms the classic CRM list into an easy-to-follow task list ✨",
			buttonText: "Continue",
			title: "🤔 uhhmm wait... why <0>Bloobirds</0>?"
		},
		firstScreen: {
			buttonText: "Tell me more",
			content: "In 3 minutes, Bloobirds transforms your Salesforce into an amazing software<0/> for your sales team. More productivity. Better usage. More data.",
			subtitle: "Welcome to <0>Bloobirds</0>, {{name}}!",
			title: "<0>The #1 Salesforce app to</0> <1>increase sales productivity</1>"
		},
		guideScreen: {
			buttonText: "Let's start"
		},
		lastScreen: {
			startBloobirds: "Discover what Bloobirds has to offer",
			title: "Welcome to <0>Bloobirds</0>"
		},
		secondScreen: {
			animationText: "Switching back and forth between different apps is a thing from the past ✨",
			buttonText: "Continue",
			content: "Make calls, send and receive emails, and LinkedIn messages <0>without leaving Salesforce.</0>\n All activity is recorded automatically",
			title: "🤔 uhhmm wait... why <0>Bloobirds</0>?"
		}
	},
	screenTexts: {
		letSystemRemindYou: "Let the system<0/> <strong>remind</strong> you."
	}
};
var notifications$1 = {
	meetingDone: "Report result of meeting with {{name}}",
	email: "Email from {{name}}",
	linkedIn: "Linkedin message from {{name}}",
	noCompanyAssigned: "No company assigned",
	cadenceEnded: "Cadence {{name}} has ended",
	cadenceEndedGeneric: "Cadence ended",
	opportunityCompany: "The {{relationship}} company {{companyName}} has created an opportunity.",
	companyRelatedAccount: "The {{relationship}} company {{companyName}} is now status ACCOUNT.",
	companyRelatedClient: "The {{relationship}} company {{companyName}} is now status CLIENT.",
	relatedCompanyMeeting: "The {{relationship}} company {{companyName}} has had a meeting.",
	relatedCompanyOpportunity: "The {{relationship}} company {{companyName}} has created an opportunity.",
	relatedCompanyActivityInbound: "The {{relationship}} company {{companyName}} has had an inbound activity",
	relatedCompanyLeadInbound: "The {{relationship}} company {{companyName}} has had a new inbound lead.",
	inboundNotification: "Inbound activity from {{name}}",
	inboundAcquisitionFormNotification: "Inbound activity from {{name}} via {{acquisitionForm}}",
	newSalesCompany: "New sales companies assigned!\nCheck it out!",
	newProspectingCompany: "New prospecting companies assigned!\nCheck it out!",
	newSalesLead: "New sales leads assigned!\nCheck it out!",
	newProspectingLead: "New prospecting leads assigned!\nCheck it out!",
	meetingBooked: "{{name}} clicked on meeting link! Keep an eye on it",
	importDone: "Import successfully completed",
	importDoneWithIssues: "Import completed but some objects couldn't be processed",
	importFailed: "Import failed to complete",
	leadCall: "Missed call from {{name}}",
	reportCallResult: "Report call result for {{name}}",
	reportCall: "Call from {{phone}}",
	leadWithoutCompany: "Lead without company",
	nylasAccountStopped: "Your email connection was stopped and needs to be reconnected",
	emailOpened: "Email opened by {{name}}",
	emailOpenedSubject: "Email opened: {{name}}",
	linkClicked: "Link clicked by {{name}}",
	linkClickedSubject: "Link clicked: {{name}}",
	syncSalesforceListDoneWithIssues: "Salesforce list synced but some objects couldn't be processed",
	syncSalesforceListFailed: "Salesforce list failed to be synced",
	syncSalesforceListDone: "Salesforce list successfully synced"
};
var reminders$1 = {
	reportCallBulk: "Report call result for {{count}} calls",
	reportCallBulkButton: "Open inbox"
};
var whatsapp$1 = {
	chat: {
		today: "Today",
		yesterday: "Yesterday"
	},
	conversation: {
		alreadySynced: "All messages are synced",
		errorSending: "There was an error sending WhatsApp message",
		errorSyncing: "Error syncing conversation",
		noContactMatch: "Can not sync conversation if there is no synced contact",
		syncWithBoobject: "Sync all visible messages in {{name}}",
		syncing: "Synchronization in progress",
		writeMessage: "Write a message"
	},
	lead: "Bloobirds lead",
	messages: {
		alreadySynced: "Message already synced",
		errorSyncing: "Error syncing message",
		noContactMatch: "Can not sync conversation if there is no synced contact",
		syncWithBoobject: "Sync Message in {{name}}",
		syncing: "Synchronization in progress"
	},
	toast: {
		error_one: "There was a problem syncing the message",
		error_other: "There was a problem syncing the messages",
		success_one: "Message with {{name}} successfully synced",
		success_other: "Messages with {{name}} successfully synced"
	}
};
var wizards$1 = {
	common: {
		back: "Back",
		cancel: "Cancel",
		confirm: "Confirm",
		next: "Next",
		requiredMessage: "Required info missing",
		saveAndClose: "Save & close",
		skipWizard: "Skip wizard",
		untitledCompany: "Untitled company"
	},
	modals: {
		inactiveHandlingModal: {
			title: "This {{bobjectType}} will become inactive"
		},
		meetingReportResultModal: {
			title: "Report Meeting Result"
		},
		changeStatusModal: {
			title: "Update Status"
		}
	},
	steps: {
		addLeadToActivityModal: {
			callout: "Register this number if you want future calls to be associated with this lead.",
			checkbox: " Update also the lead phone number with the call number",
			title: "Assign call to a lead",
			subtitle: "Select the lead you want to assign the call to",
			toast: {
				error: "There was a problem assigning the lead.",
				success: "Assigned lead successfully!"
			}
		},
		bobjectForm: {
			createTitle: "Create new opportunity",
			editTitle: "Edit opportunity",
			none: "None",
			requiredMessage: "This field is required",
			toasts: {
				errorCreating: "There was an error creating opportunity {{error}}",
				errorUpdating: "There was an error updating opportunity {{error}}"
			}
		},
		taskManagement: {
			buttons: {
				back: "Back",
				finish: "Finish reporting"
			},
			taskActions: {
				titles: {
					cadenceOnGoing: "Cadence is currently running",
					noTasks: "No next steps",
					nextSteps: "Next steps remaining"
				},
				subtitles: {
					cadenceOnGoingSubtitle: "This {{objectName}} still has tasks remaining",
					noTasksSubtitle: "Object has no next steps scheduled",
					nextStepsSubtitle: "Object has next steps scheduled"
				},
				buttonsTitle: {
					stopCadence: "Stop cadence",
					addNextSteps: "Add next step",
					startCadence: "Start cadence",
					changeCadence: "Change cadence",
					rescheduleCadence: "Reschedule cadence",
					stopCadenceLoading: "Stopping cadence",
					addNextStepsLoading: "Adding next step",
					startCadenceLoading: "Starting cadence",
					changeCadenceLoading: "Changing cadence",
					rescheduleCadenceLoading: "Rescheduling cadence"
				}
			}
		},
		callResult: {
			at: "at",
			callResult: "What is the result of the call?*",
			didYouPitch: "Did you get to pitch?",
			endFlowHere: "End call report flow here",
			endFlowHereDisclaimer: "This can be changed at any time.",
			from: "from",
			info: "{{name}} information",
			pitchPlaceholder: "Pitch used",
			title: "You just finished a call with {{name}}",
			titleNoName: "You just finished a call",
			updateNumber: "Do you want to update any of the registered numbers?",
			"with": "with",
			recallTaskTitle: "Recall",
			updateProperty: {
				title: "Update"
			},
			recall: {
				toast: "Task created successfully",
				sectionText: "Create a task to call again in",
				options: {
					in1Hour: "In 1 hour",
					in2Hours: "In 2 hours",
					in4Hours: "In 4 hours",
					tomorrowMorning: "Tomorrow morning",
					tomorrowAfternoon: "Tomorrow afternoon",
					custom: "Select custom date and time"
				},
				selectedDate: "Selected date",
				okButton: "Ok"
			}
		},
		callResultOpp: {
			ableToContact: "Have you been able to contact?*",
			addANote: "Add a note",
			addInfo: "Do you want to add any information?",
			no: "No",
			placeholder: "Start typing your note here...",
			yes: "Yes"
		},
		changeSalesStatus: {
			leadStatusPlaceholder: "Lead {{status}} reason",
			reason: "What is the reason for the change in status?",
			title: "Do you want to update the {{bobjectType}} status?"
		},
		changeStatus: {
			companiesStatusMessage: "<strong>The selected company status will stop the cadence.</strong> All future communication needs to be scheduled manually and should be based on what you discussed during your call.",
			leadStatusTexts: {
				LEAD__STATUS__CONTACT: "I need to create an opportunity or review an existing one",
				LEAD__STATUS__CONTACT_NO_CREATE_LEAD: "The lead has become a new contact to create a future opportunity",
				LEAD__STATUS__CONTACTED: "I got in touch with the lead, but they aren't interested yet",
				LEAD__STATUS__DISCARDED: "I should stop contacting the lead and discard them",
				LEAD__STATUS__ENGAGED: "I got in touch with the lead, they're interested!",
				LEAD__STATUS__MEETING: "The lead accepted a meeting, and I need to schedule it",
				LEAD__STATUS__NURTURING: "I should stop contacting the lead and try again in the future",
				LEAD__STATUS__ON_PROSPECTION: "I couldn't reach the lead yet and I want to keep trying"
			},
			placeholder: "{{bobject}} {{status}} reason",
			toasts: {
				success: "Status updated succesfully!"
			},
			tooltipDictionary: {
				COMPANY__STATUS__CONTACTED: "Used for when you have a correct contact. You got in touch with the right person",
				COMPANY__STATUS__DISCARDED: "Used for when the qualifying questions indicate the company is not a potential client. This will set all leads within the company to Discarded status as well",
				COMPANY__STATUS__ENGAGED: "Used for when one of the leads has the status Engaged. The company status then changes accordingly.",
				COMPANY__STATUS__MEETING: "Used for when you schedule a meeting between a lead and the Account Executive",
				COMPANY__STATUS__NURTURING: "Used for when it has not been possible to contact any lead within the cadence period. This will set all leads within the company to Nurturing status as well.",
				DEFAULT_TEXT: "The lead and company status are closely related, therefore depending on the selected lead status the company status may change as well",
				HEADER_TEXT: "The lead and company status are closely related, therefore depending on the selected lead status the company status may change as well",
				LEAD__STATUS__CONTACTED: "Used for when you got in touch with the lead",
				LEAD__STATUS__DISCARDED: "Used for when the lead is not a suitable contact to continue prospecting with",
				LEAD__STATUS__ENGAGED: "Used for when the lead is interested and has answered the qualifying questions",
				LEAD__STATUS__MEETING: "Used for when you have scheduled a meeting between the lead and the Account Executive",
				LEAD__STATUS__NURTURING: "Used for when you were not able to contact the lead within the cadence period but you want to try again later"
			},
			whatReason: "What is the reason for the change in status?"
		},
		customObject: {
			errorToast: "There was an error creating object in Salesforce {{error}}",
			none: "None",
			requiredMessage: "This field is required"
		},
		inactiveHandling: {
			actionForm: {
				addTask: {
					placeholders: {
						assignedTo: "Assigned To",
						scheduleTime: "Schedule Time",
						title: "Title *"
					},
					title: "Add the task’s details"
				},
				discard: {
					title: "Discarded reason*",
					titleOpp: "Closed lost reason*"
				},
				onHold: {
					placeholder: "On Hold Reason *",
					title: "What is the reason for sending to on hold?"
				},
				previousAssign: {
					assignToMe: "Assign to me",
					keepOwner: "Keep the current owner",
					subtitle: "This {{bobjectType}} is not assigned to you. Cadence tasks are always assigned to the <strong>current owner.</strong>",
					title: " Who do you want to assign it to?"
				},
				reassign: {
					placeholder: "Assigned To",
					title: "Select a colleague to reassign"
				}
			},
			actions: {
				backlogUnassign: "Send back to backlog and unassign",
				createNextStep: "Create a next step",
				enrollCadence: "Enroll in a new cadence",
				reassign: "Reassign",
				sendToHold: "Send to hold",
				sendToNurturing: "Send to nurturing and set cadence"
			},
			company: {
				actionText: "What is the reason for discarding the company and leads",
				discardCompanyAndLeads: "Discarding a company will stop its cadence or tasks but it will remain in the database.",
				discardedRadioText: "Discard company and leads",
				setBacklogAndUnassign: "If you think this company is a candidate for a fresh start, select this option and send it back to the backlog to be reassigned."
			},
			confirm: "Confirm",
			informationPanel: {
				backToBacklog: {
					title: "👉 Thinking of starting from scratch?"
				},
				discard: {
					subtitle: "It's possible to find it in the lists and subhomes, filtering by 'Discarded' status.",
					title: "👋 Think you can't do more?"
				},
				newCadence: {
					description: " This task will appear in your home and subhomes on the scheduled day.",
					link: "<0>Click here</0> if you want to know more about cadences",
					subtitle: "Enroll it into a new cadence and try to reach out again.",
					title: "💬 Do you think you should keep insisting?"
				},
				nextStep: {
					description: "This task will appear in your home and subhomes on the scheduled day.",
					link1: "Also, you will be notified if you have <0>reminders</0> activated.",
					link2: "<0>Click here</0> if you want to know more about tasks!",
					subtitle: "Create a task so you don't forget!",
					title: "✨ Are you sure what to do next?"
				},
				onHold: {
					subtitle: "Select this option if you think this company or lead should not be discarded nor sent to nurture, but rather you expect to do something with it in the future.",
					title: "👉 I don't want to do anything"
				},
				reassign: {
					subtitle: "Select this option if you think this company or lead should be worked by another colleague, for example because its from a target market that does not belong to you.",
					title: "👉 Do you think it should be worked on by another colleague?"
				},
				sendToNurturing: {
					link1: "This task will appear in your home and subhomes on the scheduled day. Remember that <0> automated cadences </0> are really useful for nurturing!",
					link2: "<0>Click here</0> to know more about how to improve your nurturing process.",
					subtitle: " Nurturing is an active status used to maintain a minimum of contact and/or sharing content in order to keep trying to convert a company or lead.",
					title: "🔄 Do you think not everything is lost?"
				}
			},
			lead: {
				actionText: "What is the reason for discarding the lead",
				discardCompanyAndLeads: "Discarding a lead will stop its cadence or tasks but it will remain in the database.",
				discardedRadioText: "Discard lead",
				setBacklogAndUnassign: "If you think this lead is a candidate for a fresh start, select this option and send it back to the backlog to be reassigned."
			},
			missingInfoTooltip: "Required info missing",
			opportunity: {
				actionText: "What is the reason for closing the opportunity",
				discardCompanyAndLeads: "Discarding an opportunity will stop its cadence or tasks but it will remain in the database.",
				discardedRadioText: "Close opportunity",
				setBacklogAndUnassign: "If you think this opportunity is a candidate for a fresh start, select this option and send it back to the backlog to be reassigned."
			},
			toasts: {
				backToBacklog: "{{bobjectType}} sent to backlog and unassigned",
				companyAndLeads: "company and its leads",
				discard: "The {{bobjectType}} has been discarded",
				discardCompany: "Company and leads have been discarded",
				newCadence: "Cadence has been scheduled",
				nextStep: "Task created!",
				onHold: "The ${bobjectType} status has changed to status On Hold",
				onHoldCompany: "Company and leads status have changed to status On Hold",
				reassign: "{{bobjectType}} has been reassigned to the selected user",
				sendToNurturing: "Nurturing cadence scheduled for the {{bobjectType}}"
			}
		},
		meetingReportResult: {
			meetingResult: "What is the result of the meeting?*",
			meetingType: "Meeting type",
			title: "You just finished a meeting with {{name}}"
		},
		meetingResultNotes: {
			addCallNotes: "Add call notes",
			addMeetingNotes: "Add meeting notes",
			addNotes: "Add notes",
			createNew: "Create new",
			emptyPlaceholder: "You do not have any notes on this object yet, <1>create one to continue!</1>"
		},
		notesAndQQs: {
			addANote: "Add a note",
			fillTheQQs: "Fill the qualifying questions",
			howWasTheCall: "How was the call?",
			placeholder: "Start typing your note here..."
		},
		opportunityControl: {
			choose: "Choose from your active opportunities to continue",
			"continue": "Continue without opportunity",
			edit: "Edit an existing opportunity",
			title: "What do you want to do with your opportunities?"
		},
		scheduleNextSteps: {
			assignedTo: "Assigned to",
			descriptionPlaceholder: "Describe your task...",
			dueDate: "Due date",
			saveAndSchedule: "Save & schedule next step"
		},
		changeSalesforceStatus: {
			toasts: {
				errorUpdating: "There was an error updating opportunity {{error}}",
				success: "Status updated successfully!"
			}
		}
	},
	titles: {
		bobjectForm: "Opportunity",
		callResult: "Report call result",
		callResultOpp: "Report call result",
		changeSalesStatus: "Update the status",
		changeStatus: "Update the status and decide on the next step",
		changeStatusSalesforce: "",
		convertObject: "Send to sales",
		customObject: "Create custom object",
		crmUpdates: "Crm Updates",
		initial: "",
		notes: "Notes",
		notesAndQQs: "Report call result",
		onlyQQs: "Qualifying questions",
		opportunityControl: "Opportunities Control",
		opportunityControlOTO: "Opportunity",
		scheduleNextSteps: "Create next step",
		addLeadToActivity: "Add lead to activity",
		statusNoteActions: "Status, Call Note and Quick Actions",
		taskManagement: "Task Management"
	}
};
var tasksTitles$1 = {
	contactBeforeMeeting: "Contact before meeting",
	cadenceStep: {
		"1": "1rst step",
		"2": "2nd step",
		"3": "3rd step",
		other: "{{number}}th step"
	},
	timezone: "It's {{hour}} in {{location}}",
	timezoneError: "The user is in {{location}}",
	call: "Call",
	email: "Email",
	inbound: "Inbound",
	linkedin: "LinkedIn",
	meeting: "Meeting",
	whatsapp: "Whatsapp",
	task: "Task",
	customActivity: "Custom activity",
	other: "Other"
};
var signatures$1 = {
	selectToolbarEmail: {
		edit: "Edit signatures",
		create: "Create signatures"
	}
};
var userSetings$1 = {
	email: {
		connections: {
			title: "Your connected email accounts",
			empty: "You have no accounts connected. Connect your first account with Google or Outlook"
		},
		tracking: {
			title: "Email tracking notifications",
			notifyCheck: "Notify me when a lead opens, clicks or replies my emails"
		},
		signature: {
			title: "Manage your email signature",
			subtitle: "Edit and manage your email signatures",
			addCheck: "Add my signature at the bottom when I compose emails",
			changeCheck: "Enable change signature when I compose emails",
			"new": "New",
			preview: "HTML Preview",
			html: "HTML",
			bloobirdsEditor: "Bloobirds Editor",
			noSelected: {
				title: "You do not have any signature selected.",
				subtitle: "Create one or select one to start editing it"
			},
			checkSignatureSettings: {
				title: "You already have a signature created",
				subtitle: "If you want to add another or modify the existing one click below",
				button: "Manage signatures"
			},
			noCreated: {
				title: "Not signatures created",
				subtitle: "Create one to start customizing your emails!",
				button: "Create new signature"
			},
			dirtyModal: {
				title: "Changes not saved",
				text: "If you start creating another signature, you’ll lose the changes not saved in the current signature",
				question: "Do you wish to continue?"
			},
			confirmationModal: {
				title: "Delete signatures",
				text: "If you delete this signature, you’ll <strong>lose it permanently</strong> and will have to create it again to use it.",
				question: "Do you wish to continue?"
			},
			modal: {
				cancel: "Cancel",
				"continue": "Continue",
				confirm: "Confirm"
			},
			htmlInvalid: "The HTML of the signature is invalid, it may contain non closed tags or invalid characters",
			richTextInvalid: "The signature is invalid, it may contain invalid characters",
			saved: "Signature saved successfully",
			namePlaceholder: "Signature name...",
			nameRequired: "A name for the signature is required",
			htmlPlaceholder: "Create or paste your HTML Signature here...",
			discard: "Discard",
			save: "Save",
			tooltips: {
				setAsDefault: "Mark as default. Used when composing and scheduling emails",
				"delete": "Delete signature"
			}
		}
	}
};
var taskFeedErrorPage$1 = {
	title: "Cannot load any task",
	subtitle: "There was an error loading your tasks. \nIt may be caused by your Internet connection or our services are offline. ",
	linkText: "If the problem persists, please <0>contact support</0>",
	reloadButton: "Reload task feed"
};
var en$2 = {
	userSettingsWebapp: userSettingsWebapp$1,
	accountSettings: accountSettings$1,
	activityTimelineItem: activityTimelineItem$1,
	addLeadToActivityModal: addLeadToActivityModal$1,
	addToCalendarModal: addToCalendarModal$1,
	ai: ai$1,
	assignUserModal: assignUserModal$1,
	bobjectSelector: bobjectSelector$1,
	bobjectTypes: bobjectTypes$1,
	bobjects: bobjects$1,
	brandedButtons: brandedButtons$1,
	cadence: cadence$1,
	calendar: calendar$1,
	callDetail: callDetail$1,
	captureSalesforce: captureSalesforce$1,
	changeStatusModal: changeStatusModal$1,
	changeTzModal: changeTzModal$1,
	emailTemplatePage: emailTemplatePage$1,
	common: common$1,
	confirmCloseModal: confirmCloseModal$1,
	contactFlowModal: contactFlowModal$1,
	copyText: copyText$1,
	crmUpdatesModal: crmUpdatesModal$1,
	dates: dates$1,
	dayCalendar: dayCalendar$1,
	detailedActivity: detailedActivity$1,
	emailModal: emailModal$1,
	en: en$1,
	es: es$2,
	extendedScreen: extendedScreen$1,
	extension: extension$1,
	generalSearchBar: generalSearchBar$1,
	helperKeys: helperKeys$1,
	home: home$1,
	languages: languages$1,
	leftBar: leftBar$1,
	linkedInDetail: linkedInDetail$1,
	meetingModal: meetingModal$1,
	minimizableModals: minimizableModals$1,
	misc: misc$1,
	notes: notes$1,
	playbook: playbook$1,
	quickLogModal: quickLogModal$1,
	quickStartGuide: quickStartGuide$1,
	richTextEditor: richTextEditor$1,
	scheduler: scheduler$1,
	sidePeek: sidePeek$1,
	smartEmailModal: smartEmailModal$1,
	tasks: tasks$1,
	taskFeed: taskFeed$1,
	templateSelector: templateSelector$1,
	tooltips: tooltips$1,
	dialer: dialer$1,
	validation: validation$1,
	welcomeScreens: welcomeScreens$1,
	notifications: notifications$1,
	reminders: reminders$1,
	whatsapp: whatsapp$1,
	wizards: wizards$1,
	tasksTitles: tasksTitles$1,
	signatures: signatures$1,
	userSetings: userSetings$1,
	taskFeedErrorPage: taskFeedErrorPage$1
};

var userSettingsWebapp = {
	title: "Configuración personal",
	documentTitle: "Configuración de usuario",
	tabs: {
		general: "General",
		email: "Correo electrónico",
		calls: "Llamadas",
		linkedin_extension: "Aplicación de Chrome",
		meetings: "Reuniones",
		cadence: "Cadencia",
		security: "Seguridad",
		connections: "Correo electrónico",
		reminders: "Tareas y recordatorios",
		whatsapp: "Whatsapp"
	},
	personalDetails: {
		title: "Detalles personales",
		name: "Nombre",
		shortname: "Nombre corto",
		color: "Color",
		timezone: {
			title: "Zona horaria",
			placeholder: "Zona horaria"
		},
		email: {
			title: "Cambiar correo electrónico de inicio",
			subtitle: "Su dirección de correo es actualmente <strong>{{email}}</strong>",
			placeholder: "Nueva dirección de correo electrónico",
			validation: "Debe ser un correo electrónico válido",
			verification: "Hemos enviado un correo de verificación al nuevo correo electrónico. Una vez que se verifique, se establecerá como su correo electrónico."
		},
		language: {
			title: "Cambiar idioma",
			subtitle: "Su idioma actual está configurado en <strong>{{language}}</strong>"
		},
		save: "Guardar cambios",
		toasts: {
			success: "¡Sus configuraciones han sido actualizadas!",
			error: "¡Hubo un error al guardar sus configuraciones personales!"
		}
	},
	callSettings: {
		title: "Marcador por defecto",
		disabledMessage: "Su usuario no tiene un usuario de {{dialerName}} asignado, ¡pida a su administrador que asigne uno!",
		bloobirdsDialer: {
			phoneText: "Sus números de teléfono privados conectados",
			addPhone: "Agregar teléfono",
			noPhoneNumbers: "No tiene números de teléfono conectados",
			incomingCalls: "¿Cómo quiere recibir las llamadas entrantes?",
			byWebDialer: "Por marcador web",
			item: "Por llamada telefónica ({{phone}})",
			tooltip: "Un número de teléfono privado es el número de su dispositivo móvil. Al realizar llamadas con Bloobirds, llamaremos a este número para conectarlo con el número del prospecto. Nunca se mostrará su número privado al prospecto. En su lugar, verán el número de Bloobirds asignado a su cuenta."
		},
		aircallDialer: {
			checkbox: "Sincronice sus contactos de Bloobirds con {{dialer}}"
		},
		manualCalls: {
			title: "¿Quiere poder registrar llamadas manualmente desde el marcador?",
			checkbox: "Habilitar vista de registro de llamadas manualmente"
		},
		dialerView: {
			title: "Seleccione la vista predeterminada del marcador",
			webDialer: "Llamar por marcador web",
			logCall: "Registrar llamadas manualmente"
		},
		matchingLead: {
			title: "Cambiar automáticamente el teléfono del usuario a uno que coincida con la extensión telefónica del prospecto si está disponible",
			checkbox: "Cambio automático de extensión telefónica"
		},
		viewOnCall: {
			title: "Seleccione la vista que desea ver al realizar una llamada",
			pitches: "Guiones en Mensajería",
			activityFeed: "Feed de actividad"
		},
		saveChanges: "Guardar cambios",
		addPhoneModal: {
			title: "Agregue su número de teléfono",
			addPhoneStep: {
				title: "Añade su número de teléfono",
				missingPrefix: "El prefijo no puede estar vacío",
				invalidPrefix: "Prefijo no válido",
				countryPlaceholder: "País",
				phoneEmpty: "El número de teléfono no puede estar vacío",
				invalidPhone: "Número de teléfono no válido",
				phoneUsed: "El número de teléfono ya fue utilizado",
				callout: "<strong>Asegúrese de desactivar su buzón de voz.</strong> Las llamadas salientes se conectarán primero a su teléfono antes de conectar con los prospectos. Si tiene el buzón de voz activado, el sistema podría confundir esto con que usted ha respondido la llamada y continuar sin querer conectándose con el prospecto.",
				cancel: "Cancelar",
				save: "Guardar"
			},
			defaultPhoneStep: {
				title: "¡{{phone}} ha sido agregado!",
				list: {
					"1": "Ahora puede usar este número de teléfono para llamar a prospectos",
					"2": "Ahora puede llamar a (50) países diferentes",
					"3": "Este número nunca se mostrará a sus prospectos - Se muestra su número de Bloobirds en su lugar"
				},
				checkbox: "Establecer este número de teléfono como mi opción predeterminada para llamadas",
				done: "Hecho"
			}
		},
		toasts: {
			incoming: "Método de llamadas entrantes actualizado",
			dialerDefault: "Valor predeterminado del marcador actualizado"
		}
	},
	disconnectModal: {
		title: "Confirmar desconexión de {{nameType}}",
		email: "correo",
		phoneNumber: "número",
		content: "¿Está seguro de que desea desconectar {{connection}}?",
		checkbox: "Sí, desconectar {{connection}} de mis {{nameType}}s privados",
		callout: "Usted <strong>ya no podrá hacer llamadas con este número</strong>. Para usarlo nuevamente más tarde, tendrá que repetir la verificación telefónica.",
		cancel: "Cancelar",
		confirm: "Confirmar"
	},
	addAliasModal: {
		toasts: {
			success: "¡Alias creado con éxito!",
			error: "Hubo un error al crear el alias, por favor intente nuevamente más tarde."
		},
		title: "Agregar alias de correo electrónico",
		contentHeader: "Ingrese un nuevo alias de correo electrónico para la cuenta",
		content: "⚠️ Tenga en cuenta que debe configurar sus alias correctamente si está utilizando una cuenta de <0>Gmail</0> o <1>Outlook</1>.",
		validation: "Este no es un correo electrónico válido",
		footer: "Esta dirección de correo electrónico será un nuevo alias vinculado a su cuenta.",
		cancel: "Cancelar",
		confirm: "Confirmar"
	},
	changeSignatureModal: {
		title: "Cambiar firma",
		placeholder: "Seleccionar una firma",
		cancel: "Cancelar",
		save: "Guardar"
	},
	chromeAppSettings: {
		title: "<0>¡El complemento Bloobirds Capture</0> le ayuda a prospectar <0>10 veces más rápido! 🚀</0>",
		subtitle: "Investigue a sus prospectos en LinkedIn y guárdelos directamente en Bloobirds, ¡con solo un clic!",
		link: "Puede descargar la última versión aquí.",
		knowledge: "Para obtener instrucciones fáciles sobre cómo instalar y usar el complemento Bloobirds Capture, consulte nuestra <0>base de conocimientos.</0>"
	},
	whatsappSettings: {
		title: "Habilitar sincronización automática de chats",
		subtitle: "Sincronice automáticamente el chat de un prospecto al acceder desde WhatsApp web, siempre que esté guardado en la base de datos.",
		checkbox: "Habilitar sincronización automática de chats de WhatsApp",
		disableText: "Esta función está habilitada por defecto por un administrador de la cuenta. Si desea deshabilitarla, hable con su supervisor.",
		toasts: {
			success: "¡Sus configuraciones han sido actualizadas!",
			error: "¡Hubo un error al guardar sus configuraciones personales!"
		}
	},
	meetingSettings: {
		title: "Mis enlaces",
		addLink: "+ Agregar enlace",
		noMeetings: "¡No se han creado enlaces de reuniones!",
		noMeetingsSubtitle: "Seleccione la hora del día en que está disponible para sus reuniones y cree un enlace para enviar a sus clientes para reservar reuniones 📅",
		meetingEntityCard: {
			setDefault: "Establecer como predeterminado",
			edit: "Editar"
		},
		deleteMeetingLink: "Está a punto de eliminar un enlace de reunión. Esta acción no se puede deshacer. ¿Desea continuar?",
		createEditMeetingModal: {
			createTitle: "Crear nuevo enlace de reunión",
			editTitle: "Editar enlace de reunión",
			title: "Elija cuándo se pueden reservar sus reuniones 📅",
			subtitle: "Establezca un título y vincule un horario externo, para que sus clientes sepan exactamente cuándo puede programar una reunión con ellos.",
			titlePlaceholder: "Título *",
			meetingLinkPlaceholder: "Enlace de reunión *",
			cancel: "Cancelar",
			"delete": "Eliminar",
			setAsDefault: "Establecer como predeterminado",
			saveChanges: "Guardar cambios",
			create: "Crear",
			validation: "El formato de la URL no es válido"
		}
	},
	cadenceSettings: {
		title: "Pausas activas",
		pauseCadence: "Pausar cadencia",
		calloutTitle: "¡Este proceso puede tardar en finalizar! Sus tareas se están reprogramando...",
		calloutSubtitle: "¡Espere unos minutos antes de intentar pausarlo nuevamente!",
		noCadenceTitle: "¡No hay pausas activas hasta ahora!",
		noCadenceSubtitle: "¿Se va de vacaciones por unos días? 🌴 Pause sus cadencias durante los días que estará fuera. ¡Puede reanudarlas cuando regrese!",
		showPast: "MOSTRAR PAUSAS PASADAS",
		hidePast: "OCULTAR PAUSAS PASADAS",
		pauseCadenceCard: {
			edit: "Editar",
			cancel: "Cancelar",
			sure: "¿Seguro?",
			date: "Desde {{fromDate}} hasta {{toDate}}"
		},
		pauseCadenceModal: {
			title: "Programar marco de tiempo de pausa",
			mainText: "Elija cuándo pausar sus cadencias",
			subMainText: "Seleccione los días en que no estará disponible. Las nuevas cadencias tendrán en cuenta sus pausas y las cadencias existentes omitirán estos días.",
			pausePlaceholder: "Nombre de la pausa*",
			startDateValidation: "La fecha de inicio debe ser futura",
			startDatePlaceholder: "Desde*",
			endDateValidation: "La fecha de finalización debe ser posterior a la fecha de inicio",
			endDatePlaceholder: "Hasta*",
			cancel: "Cancelar",
			updatePause: "Actualizar pausa",
			schedulePause: "Programar pausa",
			mandatoryError: "Este es un campo obligatorio"
		}
	},
	reminderSettings: {
		toasts: {
			success: "¡Sus configuraciones de recordatorio han sido actualizadas!",
			error: "¡Hubo un error al guardar sus configuraciones de recordatorio!",
			example: {
				title: "Esta es una tarea de prueba que vence en {{minutes}} minutos",
				subtitle: "Ejemplo Compañía S.A."
			}
		},
		autoCompletion: {
			title: "Finalización automática de tareas",
			checkbox: "Complete automáticamente sus tareas de Cadencia y Programadas al hacer un intento."
		},
		autoLogActivity: {
			title: "Registro automático de actividad personalizada",
			checkbox: "Registrar automáticamente la actividad personalizada al completar una tarea personalizada."
		},
		taskReminder: {
			title: "Recordatorio de tareas",
			checkbox: "Reciba una notificación emergente antes de la hora programada de la tarea",
			reminderTimeText: "¿Con cuánta anticipación desea ser notificado antes de la hora programada?",
			options: {
				"1": "1 minuto",
				"5": "5 minutos",
				"10": "10 minutos",
				"20": "20 minutos",
				"30": "30 minutos",
				"60": "1 hora",
				"120": "2 horas"
			},
			playSoundText: "Reproducir un sonido cuando reciba una nueva notificación",
			test: "Probar"
		},
		saveChanges: "Guardar cambios"
	},
	passwordSettings: {
		toasts: {
			success: "¡Su contraseña ha sido actualizada!",
			error: "¡Su contraseña no es correcta!"
		},
		title: "Cambiar su contraseña",
		pwdPlaceholder: "Contraseña actual",
		newPwdPlaceholder: "Nueva contraseña",
		rule1: "Al menos 8 caracteres",
		rule2: "Una letra mayúscula",
		rule3: "Una letra minúscula",
		rule4: "Un número o símbolo especial",
		reset: "Restablecer contraseña"
	}
};
var accountSettings = {
	crmStatus: {
		chooseSalesforceField: "Elige un campo de Salesforce si deseas usarlos en tus informes.",
		confirmContinue: "¿Estás seguro de que desea continuar?",
		confirmDeleteField: "Estás eliminando el Campo de Salesforce utilizado para determinar los estados. Perderás las relaciones que hayas establecido. Esta acción no se puede deshacer.",
		confirmEditField: "Estás a punto de cambiar el Campo de Salesforce utilizado para determinar los estados. Perderás las relaciones que hayas establecido. Esta acción no se puede deshacer.",
		goBackButton: "Volver",
		infoStatus: {
			active: "<strong>Activo:</strong> Sigue planeando tus próximos pasos en una relación de ventas activa.",
			inactive: "<strong>Inactivo: </strong>No hay un proceso de ventas activo y no hay recordatorios de próximos pasos.",
			lost: "<strong>Perdido: </strong> Cuando se pierde una oportunidad de ventas con el contacto.",
			nurturing: "<strong>Nurturing:</strong> Mantén la interacción, pero con un cronograma de ventas más largo.",
			won: "<strong>Ganado: </strong> Cuando has asegurado una oportunidad de ventas con el contacto."
		},
		modalSelectField: "Por favor, selecciona el <strong>Campo de estado de Salesforce</strong> para mapear con el sistema de estados de Bloobirds.",
		modalSelectSearch: "Buscar...",
		noSalesforceFieldSelected: "Ningún campo de Salesforce seleccionado",
		noStatusSelected: "Ningún estado seleccionado",
		removeRelationButton: "Eliminar relación",
		resync: "Resinc",
		salesforceStatusField: "Campo de estado de Salesforce: ",
		saveButton: "Guardar",
		selectSalesforceField: "Selecciona el campo de Salesforce",
		selectStatus: "Selecciona un estado",
		subtitle: "<strong>Organiza tus estados de Salesforce</strong> según la etapa actual de tu relación con cada contacto. Categorizar tus estados en Bloobirds te ayudará a <strong>agregar inteligencia</strong> a tus tareas, <strong>organizar</strong> tu pipeline, recortar empresas inactivas y mucho más.",
		tabTitle: "{{crmObject}} Relaciones de Estado",
		title: "Estados en la cima de Salesforce",
		updateFieldFailed: "Hubo un error al actualizar el campo de estado de Salesforce.",
		updateFieldSuccess: "Campo de estado de Salesforce actualizado con éxito."
	},
	dialers: {
		aircall: {
			active: "activa",
			aircallAccount: "Cuenta de Aircall",
			aircallBloobirdsProduction: "Producción de Bloobirds",
			aircallBloobirdsUser: "Usuario de Bloobirds",
			aircallConnectInfo: "Conectar su cuenta de Aircall le permitirá llamar en Bloobirds mediante el marcador de Aircall y sincronizar la actividad telefónica con sus datos de Bloobirds.",
			aircallDashboard: "Panel de Aircall",
			aircallNotConnected: "Aircall no está conectado",
			aircallNumbersNotAdded: "Tiene {{numbersNotInIntegration}} {{numbersCounter}} no agregados en la integración. Recuerde agregar todos sus números en la integración para evitar que las llamadas no se registren en Bloobirds. Para agregar más números, vaya a su ",
			aircallNumbersNotAddedPost: ". Esto también se puede agregar en un correo electrónico de éxito de integración o un mensaje similar",
			aircallSyncContacts: "Sincronizar contactos desde Bloobirds",
			aircallUserEmail: "Correo electrónico de usuario de Aircall",
			aircallUserName: "Nombre de usuario de Aircall",
			aircallUsers: "Usuarios de Aircall",
			aircallUsersTooltip: "Los usuarios de Aircall se sincronizan automáticamente cada vez que se eliminan o crean. Si no ve a algunos de ellos, puede intentar actualizarlos.",
			confirmConnectAircall: "¿Desea conectar su cuenta de Aircall?",
			connectAircall: "Conectar Aircall",
			connectedNumbers: "Números conectados",
			inactive: "inactiva",
			integrationCurrentState: "Su integración está actualmente",
			matchAircallUsers: "Empareje sus usuarios de Bloobirds con los de Aircall para emparejar llamadas entre sistemas.",
			number_one: "número",
			number_others: "números",
			phoneAddedIntegration: "Teléfono agregado a la integración de Aircall",
			phoneName: "Nombre del teléfono",
			phoneNumber_one: "Número de teléfono",
			recordingEnabled: "Grabación habilitada",
			refreshingNumbers: "Actualizando números...",
			refreshingUsers: "Actualizando usuarios...",
			title: ""
		},
		numintec: {
			status: {
				notConnected: "Numintec no está conectado",
				connectHint: "Conecte su cuenta de Numintec para poder llamar desde Bloobirds.",
				connectQuestion: "¿Desea conectar su cuenta de Numintec?",
				connect: "Conectar",
				status: "La integracion está actualmente {{status}}",
				active: "activa",
				inactive: "inactiva",
				successfullyConnected: "¡Integración de Numintec conectada con éxito!",
				logInTitle: "Iniciar sesión en Numintec",
				errorConnecting: "Hubo un error al conectar la integración de Numintec. Revisa tus credenciales y asegurate de que tu usuario tenga permisos para acceder a la API de Numintec."
			},
			title: "Integración de Numintec",
			account: "Cuenta de Numintec",
			integrationName: "Bloobirds",
			"delete": "Eliminar",
			users: "Usuarios de Numintec",
			usersHint: "Si no ve a algunos de ellos, puede intentar actualizarlos.",
			refresh: "Actualizar",
			refreshing: "Actualizando usuarios...",
			map: "Vincula tus usuarios de Bloobirds con los de Numintec para emparejar llamadas entre sistemas.",
			numintecUserName: "Nombre de usuario de Numintec",
			numintecUserExtension: "Extensión de usuario de Numintec",
			bloobirdsUser: "Usuario de Bloobirds",
			deleteAssurance: "¿Estás seguro de que deseas eliminar esta integración?",
			errorMappingSameUser: "No puedes mapear un usuario de Bloobirds con más de un usuario de Numintec.",
			defaultSignaturePhone: "Teléfono firma",
			defaultPhoneSaveOk: "El teléfono se ha actualizado correctamente",
			defaultPhoneSaveKo: "Ha habido un error al actualizar el teléfono, por favor inténtalo de nuevo",
			defaultPhoneNoNumintecUser: "Este usuario no tiene ningún Numintec User Id relacionado"
		},
		title: "Marcador",
		twilio: {
			accountSidPlaceholder: "SID de la cuenta de Twilio *",
			addPhoneNumber: "Agregar un número de teléfono",
			applicationSidPlaceholder: "SID de la aplicación de Twilio *",
			authTokenPlaceholder: "Token de autenticación de Twilio *",
			bloobirdsUsers: "Usuarios de Bloobirds",
			confirmConnectTwilio: "¿Desea conectar su cuenta de Twilio?",
			connectTwilio: "Conectar Twilio",
			connectedNumbers: "Números conectados",
			connectedNumbersSubtitle: "Agregue sus números de Twilio y asígneles a los usuarios de Bloobirds para usarlos en nuestro marcador.",
			enableCallRecording: "Habilitar la grabación de llamadas",
			enterTwilioNumber: "Ingrese su número de teléfono de Twilio",
			here: "aquí",
			howToCreate: "Vea cómo crear y configurar una cuenta de Twilio",
			integrationDeletedSuccess: "¡Integración de Twilio eliminada con éxito!",
			integrationUpdatedSuccess: "¡Configuración de Twilio actualizada!",
			isVerifiedCalledId: "¿Es este número una Identificación de Llamadas Verificada?",
			location: "Ubicación",
			mandatoryField: "Este es un campo obligatorio",
			newPhoneNumber: "Nuevo número de teléfono",
			noPhoneNumbersFound: "No se encontraron números de teléfono",
			phoneByDefault: "Teléfono por defecto",
			phoneNumber_one: "Número de teléfono",
			phoneNumber_other: "Números de teléfono",
			requiredField: "Este campo es obligatorio",
			setUpTwilio: "Configure su cuenta de Twilio",
			sid: "SID",
			sidNumber: "Número de SID",
			subtitle: "Vea cómo crear y configurar una cuenta de Twilio ",
			title: "Cuenta de Twilio",
			twilioConnectInfo: "Conectar su cuenta de Twilio le permitirá llamar con el marcador de Bloobirds.",
			twilioNotConnected: "Twilio no está conectado",
			updatePhone: "Actualizar teléfono",
			verifiedCallerId: "Identificación de llamadas verificada"
		}
	},
	email: {
		emailSafetySubtitle: "Configure la configuración general de seguridad del correo electrónico, como el número máximo de correos electrónicos enviados por día, el retraso antes de enviar el primer correo electrónico, etc.",
		emailSafetyTitle: "Seguridad del correo electrónico",
		emailsPerDay: "Máximo de correos enviados por un usuario en un día",
		emailsPerDayTooltip: "Establezca el número máximo de correos electrónicos que se pueden enviar por día. Esto evitará que los servidores de correo traten sus correos electrónicos como correo masivo de alto volumen, hará que los correos electrónicos se envíen de manera más gradual y le permitirá manejar las respuestas de manera pronta. Recomendamos mantener esto por debajo de 200 correos electrónicos.",
		emailsPerMinute: "Máximo de correos enviados por minuto",
		emailsPerMinuteTooltip: "Establezca el número máximo de correos electrónicos que se pueden enviar mediante esta cuenta de correo electrónico por minuto. Por ejemplo, para las cuentas de Outlook, manténgalo por debajo de 30. Recomendamos mantenerlo por debajo de 30.",
		limitValidation: "Se recomienda que este campo no supere el límite de correos electrónicos/día.",
		minimumPerDay: "Este campo requiere un mínimo de un (1) correo electrónico por día.",
		minimumPerMinute: "Este campo requiere un mínimo de un (1) correo electrónico por minuto.",
		placeholder: "Correos electrónicos",
		required: "Requerido",
		title: "Configuración de correo electrónico",
		mappings: {
			title: "Mapeo de Correo Electrónico",
			subtitle: "",
			table: {
				email: "Correo Electrónico",
				users: "Usuarios",
				provider: "Proveedor",
				id: "ID",
				usersPlaceholder: "Usuarios de Bloobirds",
				disconnect: "Desconectar",
				requiresReconnect: "Requiere reconexión",
				accountName: "Nombre de cuenta"
			},
			emptyTitle: "No se encontraron asignaciones de correo electrónico"
		},
		connectionCard: {
			addedTime: "Añadido {{dateDistance}}",
			aliases: "Alias",
			requiresToBeReconnected: "Requiere reconexión",
			disconnect: "Desconectar",
			setDefault: "Establecer como predeterminado",
			addAlias: "Agregar alias",
			changeSignature: "Cambiar firma",
			removeSignature: "Eliminar firma",
			addSignature: "Agregar firma",
			createSignature: "Crear una firma para agregar a este correo electrónico",
			currentSignature: "Actualmente usando la firma predeterminada"
		},
		tabs: {
			mappings: "Mapeos"
		}
	},
	generalSettings: {
		language: {
			successMessage: "Idioma actualizado con éxito",
			title: "Idioma de la cuenta",
			subtitle: "Elija la configuración de idioma que se utilizará en toda la cuenta de forma predeterminada al crear nuevos usuarios."
		},
		assignment: {
			ownerPropagationFromCompany: "Habilitar la propagación del propietario (Asignado a) desde una empresa a sus prospectos relacionados",
			ownerPropagationFromLead: "Habilitar la propagación del propietario (Asignado a) desde un prospecto a su empresa relacionada",
			subtitle: "Aquí puede decidir si la asignación se puede propagar entre prospectos y empresas relacionadas.",
			successMessage: "¡Cuenta actualizada exitosamente!",
			title: "Asignación"
		},
		leads: {
			enableEmailMatching: "Habilitar la coincidencia de correo electrónico de prospectos con empresas existentes",
			leadEmailMatchingSubtitle: "Los nuevos prospectos que coincidan en el dominio con una empresa existente se vincularán automáticamente.",
			leadEmailMatchingTitle: "Coincidencia de correo electrónico de prospectos",
			title: "Prospectos"
		},
		tasks: {
			successMessage: "¡Cuenta actualizada exitosamente!",
			enableCreateActivitiesWhenCompletingCallTasks: "Crear actividades de llamada al completar manualmente una tarea de llamada",
			createActivitiesWhenCompletingCallTasksSubtitle: "Aquí puedes decidir si un tipo de llamada generará una actividad y lanzará el flujo de contacto correcto.",
			createActivitiesWhenCompletingCallTasksTitle: "Crear actividad para tareas de llamada",
			title: "Tareas"
		},
		meetings: {
			beforeMeeting: "antes de la reunión",
			calendarEventCreateAlways: "Crear siempre la reunión en Google / Outlook",
			calendarEventLetUsersDecide: "Permitir que los usuarios decidan si se creará el evento en Google / Outlook",
			calendarSubtitle: "Después de crear una reunión, el usuario podrá crearla en su calendario.",
			calendarTitle: "Calendario",
			contactBeforeMeetingSubtitle: "El usuario que crea una reunión recibirá una tarea para confirmar la asistencia de los invitados a la reunión.",
			contactBeforeMeetingTitle: "Tarea de contacto antes de la reunión",
			createMeetingInBloobirds: "Crear una reunión en Bloobirds cada vez que alguien registrado en mi base de datos me invite.",
			enableCalendarEventCreation: "Habilitar la creación de eventos en el calendario después de crear la reunión",
			enableCalendarEventCreationTooltip: "Habilitar esta opción permite que los eventos creados en Bloobirds se creen en su calendario vinculado. Si esta opción está deshabilitada, estos eventos solo serán visibles en la vista de Bloobirds en el calendario",
			enableContactBeforeMeeting: "Habilitar la tarea de contacto antes de la reunión",
			informationRequiredSubtitle: "Para crear una reunión, el usuario debe haber completado toda la información obligatoria de la empresa y el prospecto.",
			informationRequiredTitle: "Información requerida",
			mandatoryInformation: "Hacer obligatorio completar la información para crear reuniones",
			scheduleTask: "Programar tarea",
			scheduledGeneratedOnWeekends: "Quiero que la tarea programada se genere los fines de semana",
			title: "Reuniones"
		},
		subtitle: "Estos valores predeterminados se aplicarán a toda la cuenta.",
		title: "Configuración general para {{accountName}}"
	},
	objectCreation: {
		errorMessage: "Algo salió mal",
		save: "Guardar",
		sectionContent: "Habilitar la creación de objetos desde la extensión de Bloobirds para Chrome",
		sectionTitle: "¿Quieres habilitar la creación de objetos desde la extensión?",
		subtitle: "Decide si tus usuarios pueden crear leads, empresas y/o oportunidades desde la extensión de Chrome. Esta es una configuración para toda la cuenta.",
		successMessage: "¡Configuración de creación de objetos actualizada correctamente!",
		title: "Creación de Objetos"
	},
	relatedObjects: {
		title: "Objetos Relacionados de Salesforce",
		subtitle: "Elige el título para cada objeto de uno de los campos del objeto",
		iconTableHeader: "Icono",
		objectNameTableHeader: "Nombre del objeto",
		titleFieldTableHeader: "Campo de título *",
		relationshipsFieldTableHeader: "Relaciones *",
		valuesToShowTableHeader: "Valores a mostrar",
		valuesToShowTableHeaderTooltip: "Las tarjetas pueden mostrar hasta 6 campos. Los detalles de la tarjeta mostrarán todos los valores en la extensión",
		displayObjectTableHeader: "Mostrar objeto",
		banner: {
			loading: "Sincronizando objetos. NO cierres la página ni recargues. Esto puede tomar unos minutos",
			success: "¡Los nuevos objetos se han sincronizado correctamente!",
			error: "No se pudieron recuperar objetos relacionados. No se pudieron sincronizar nuevos objetos",
			noChanges: "La lista ya está actualizada. No hay más objetos para sincronizar."
		},
		loadingRelated: {
			title: "Sincronizando objetos relacionados",
			subtitle: "NO cierres la página ni recargues antes de que se complete el proceso.",
			description: "Esto puede tomar algunos minutos..."
		},
		errorRelated: {
			title: "Fallo al sincronizar objetos",
			subtitle: "No pudimos recuperar objetos relacionados. Por favor, inténtalo de nuevo.",
			description: "Si el problema persiste, contacta al soporte",
			button: "Sincronizar objetos relacionados"
		},
		noRelatedFound: {
			title: "Aún no hay objetos sincronizados",
			subtitle: "Sincroniza, configura y muestra objetos relacionados aquí",
			button: "Sincronizar objetos relacionados"
		},
		successRelated: {
			title: "No hay nuevos objetos para sincronizar",
			subtitle: "Parece que no tienes objetos para sincronizar",
			description: "Verifica la configuración de Salesforce y regresa después de que se hayan creado nuevos objetos",
			button: "Sincronizar nuevos objetos"
		},
		titleSelect: "Objetos relacionados para:",
		syncNewObjects: "Sincronizar nuevos objetos",
		searchPlaceholder: "Buscar objetos relacionados",
		addFields: "Agregar campos",
		fieldRequired: "* Campo requerido",
		titleSelectPlaceholder: "Elige un campo como título",
		relathionshipsTitlePlaceholder: "Relaciones",
		tooltipAddValues: "Agregar valores para mostrar",
		tooltipEditValues: "Editar valores para mostrar",
		tooltipRequiredFields: "Elige un campo como título y otro como relación",
		confirmCloseModal: {
			title: "Descartar valor de objeto",
			subtitle1: "Perderás el progreso en los cambios que has realizado.",
			subtitle2: "Esta acción no se puede deshacer.",
			subtitle3: "¿Estás seguro de que quieres continuar?",
			confirm: "Confirmar",
			cancel: "Cancelar"
		},
		fieldsModal: {
			preview: "Vista previa",
			previewHelper: "La vista previa mostrará los diez primeros campos seleccionados",
			title: "Agregar o editar valores de objetos",
			fieldsToDisplay: "Campos a mostrar",
			selectPlaceholder: "Buscar...",
			selectHelper: "Arrastra y suelta para reorganizar los valores o eliminarlos",
			cancel: "Cancelar",
			save: "Guardar valores"
		},
		noFieldsAdded: {
			subtitle: "Agrega algunos campos para mostrarlos en la lista",
			title: "Ningún campo añadido"
		},
		relatedCreated: "¡Objeto relacionado creado con éxito!",
		relatedUpdated: "¡Objeto relacionado actualizado con éxito!",
		relatedError: "Hubo un error al crear/actualizar el objeto relacionado, por favor inténtalo de nuevo más tarde"
	},
	salesTeam: {
		accountAdmin: "Administrador de cuenta",
		createNewUser: "Crear nuevo usuario",
		deleteButtonTooltip: "Eliminar usuario, recuerde que eliminar un usuario no elimina sus datos históricos.",
		expired: "Caducado",
		maxUsersCounter: "de {{maxUsersAllowed}} permitidos.",
		maxUsersTooltip: "Ha alcanzado la cantidad máxima de usuarios permitidos",
		noUsersCreated: "Aún no se han creado usuarios",
		noUsersFound: "No se encontraron usuarios para la búsqueda siguiente",
		pending: "Pendiente",
		resend: "Reenviar",
		resendInvitationError: "Hubo un problema al reenviar la invitación, por favor intente nuevamente más tarde",
		resendInvitationSuccess: "Invitación reenviada con éxito",
		subtitle: "Agregue nuevos usuarios y administre sus permisos.",
		title: "Equipo de ventas",
		usersTab: "Usuarios",
		teamsTab: "Equipos",
		userDeleteCallout: "Recuerde que esto no eliminará los datos históricos de los usuarios, pero ya no podrá asignar ni filtrar por este usuario.",
		userDeleteConfirm: "¿Está seguro de que desea continuar?",
		teamsManagerOfWhich_one: "Este usuario es manager de un equipo",
		teamsManagerOfWhich_other: "Este usuario es manager de {{count}} equipos",
		userDeleteWarning: "Va a eliminar permanentemente al usuario {{userName}}",
		userDeletedSuccess: "Usuario eliminado con éxito",
		usersSubtitle: "Los usuarios permitidos se basan en los usuarios creados. Si desea tener más disponibles, debe eliminar usuarios antiguos. Recuerde que eliminar un usuario no elimina la información histórica de ese usuario.",
		teamUsersPage: {
			title: "Equipos",
			subtitle: "Crea múltiples equipos y divide a tus usuarios entre ellos.",
			newTeamButton: "Nuevo Equipo",
			search: "Buscar...",
			filters: {
				clear: "Borrar",
				sort: "Ordenar",
				sortLabels: {
					fromAZ: "Nombre de A-Z",
					fromZA: "Nombre de Z-A",
					lastUpdateRecent: "Última actualización más reciente",
					lastUpdateOldest: "Última actualización más antigua"
				},
				myTeamsCheckbox: "Mis equipos",
				onlyAssociatedCheckbox: "Muestra solo mis equipos"
			},
			teamCard: {
				manage: "Gestionar",
				manager_one: "Gerente",
				manager_other: "Gerentes",
				teamMembers_one: "Miembros del Equipo",
				teamMembers_other: "Miembros del Equipo - {{count}}",
				noManager: "Sin gerente",
				noUsers: "No hay usuarios en el equipo"
			},
			createTeams: {
				createNewTeams: "Crear un nuevo equipo",
				newTeam: "Nuevo equipo"
			},
			teamManagementModal: {
				editTeam: "Editar equipo",
				createTeam: "Crear equipo",
				teamInformation: "Información del Equipo",
				icon: "Icono",
				name: "Nombre",
				nameInput: "Establecer un nombre para tu equipo",
				timezone: "Zona Horaria",
				teamMembers: "Miembros del Equipo",
				noManagerBanner: "No se puede crear un equipo sin gerente",
				user: "Usario",
				role: "Rol",
				add: "Agregar",
				nameRequired: "Es necesario un nombre para guardar el equipo",
				addTeamMember: "Agregar miembro del equipo",
				cancel: "Cancelar",
				save: "Guardar",
				saveTooltip: "No es posible guardar un equipo sin gerente",
				noUsers: "No es posible guardar un equipo sin usuarios",
				"delete": "Eliminar",
				confirmDeleteUserModal: {
					deleteButton: "Confirmar",
					cancelButton: "Volver",
					topMessage: "Al eliminar al usuario este perderá acceso a:",
					cadenceWarning: "<strong>Cadencias y plantillas</strong> del equipo",
					filtersWarning: "<strong>Visibilidad en filtros</strong> por equipo",
					bottomMessage: "Para volverlo a incluir se requerirá agregarlo manualmente. <strong>¿Deseas continuar?</strong>",
					title: "Eliminar usuario del equipo"
				},
				confirmDeleteTeamModal: {
					deleteButton: "Confirmar",
					cancelButton: "Volver",
					message: "¿Estás seguro de que quieres eliminar el equipo?",
					submessage: "Esta acción no se puede deshacer",
					title: "Eliminar equipo"
				},
				toasts: {
					create: {
						success: "Equipo creado correctamente",
						error: "No se pudo crear el equipo"
					},
					edit: {
						success: "Equipo guardado correctamente",
						error: "No se pudo guardar el equipo"
					},
					"delete": {
						success: "Equipo eliminado correctamente",
						error: "No se pudo eliminar el equipo"
					}
				},
				teamMemberCard: {
					manager: "Gerente",
					user: "Usuario"
				},
				userCreationRow: {
					searchUsers: "Buscar usuarios",
					setRole: "Establecer Rol",
					manager: "Gerente",
					user: "Usuario"
				}
			}
		}
	},
	tabs: {
		apiKeys: "Claves API",
		chromeExtension: "Extensión de Chrome",
		dependencies: "Dependencias",
		dialers: "Marcadores",
		email: "Correo electrónico",
		fields: "Campos",
		generalSettings: "Configuración general",
		notifications: "Notificaciones",
		salesTeam: "Equipo de ventas",
		salesforceRelatedObjects: "Objetos Relacionados",
		salesforceStatus: "Salesforce Estado",
		views: "Vistas"
	}
};
var activityTimelineItem = {
	activityFeed: {
		activityFrom: "Actividad de",
		allLeads: "Todos los prospectos",
		allUsers: "Todos los usuarios",
		myTasks: "Mis tareas",
		myActivities: "Mis actividades",
		emptySearchSubtitle: "Modifique su búsqueda e inténtelo de nuevo",
		emptySearchTitle: "No encontramos coincidencias para su búsqueda 🔍",
		footer: {
			add: "Agregar",
			createTask: "Crear tarea",
			discarded: "Descartado",
			done: "Hecho",
			send: "Enviar"
		},
		magicFilter: "Filtro mágico",
		noActivitiesPending: "No hay actividades pendientes",
		search: "Busca usuarios...",
		select: "Seleccionar",
		selectLead: "Seleccionar prospecto",
		selectUser: "Seleccionar usuario",
		title: "Registro de actividad"
	},
	activityTooltip: {
		doNotShowThisAgain: "No mostrar esto de nuevo",
		emailTracking: {
			description: "¡Con Bloobirds puede <strong>seguir los correos electrónicos de sus prospectos!</strong> Con esta función, puede saber si su prospecto <strong>abrió</strong> un correo electrónico y si hizo clic en alguna de las URL en el texto del correo electrónico. ¡Incluso hay un contador que le indica cuántas veces ocurrió esto!",
			title: "Seguimiento de correo electrónico"
		},
		linkedinTracking: {
			description: "Los mensajes de LinkedIn se <strong>sincronizan automáticamente en Bloobirds</strong>. Después de una conversación, sus mensajes, así como los mensajes del prospecto, se mostrarán <strong>como una conversación</strong> para que pueda revisar lo que sucedió la última vez que hablaron entre sí.",
			title: "Seguimiento de LinkedIn"
		}
	},
	attachmentsDropdown: {
		tooltip: "Tiene adjuntos"
	},
	emailIcons: {
		hasBeenReplied: "Ha sido respondido",
		tooltip: "{{openedTimes}} veces abierto \b {{clickedTimes}} veces clicado`"
	},
	item: {
		IncomingCall: "Llamada entrante",
		MissedCall: "Llamada perdida",
		OutgoingCall: "Llamada saliente",
		assignedTo: "Asignado a",
		bounced: "Rechazado",
		call: "llamada",
		callTo: "llamada a",
		clicked: "Clicado",
		clickedLink: "Enlace clicado",
		copilotCallout: {
			aiAnalysis: "Análisis de IA",
			crmUpdates: "Actualizar CRM",
			insights: "Ideas",
			nextSteps: "Próximos Pasos",
			buttons: {
				generating: "Generando",
				noResults: "No hay resultados para actualizar",
				suggestions: "Sugerencias para actualizar",
				failed: "Algo salió mal, haga click para probar otra vez"
			}
		},
		copilotInsights: {
			addToInternalNote: "Agregar a la nota interna",
			addToNote: "A la nota",
			addedToNote: "Agregado a la nota",
			aiGeneratedNote: "Resumen generado",
			backTo: "Volver a detalles de {{type}}",
			competitorsSubtitle: "Competidores mencionados por el cliente durante {{type}}:",
			competitorsTitle: "Competidores",
			noResultsFound: "No se encontraron {{title}}",
			questionsAskedSubtitle: "Estas son las preguntas que se realizaron durante {{type}}:",
			questionsAskedTitle: "Preguntas realizadas",
			showMore: "Mostrar más",
			showLess: "Mostrar menos",
			valueFitSubtitle: "Puntos clave mencionados durante la conversación",
			valueFitTitle: "Puntos clave"
		},
		emailNoSubject: "Sin asunto",
		endedCadence: "Cadencia finalizada",
		guests: "Invitados",
		hideDetails: "Ocultar detalles",
		inboundActivity: "Actividad entrante",
		join: "Unirse",
		linkedinConversation: "Conversación de LinkedIn",
		manuallyLoggedActivity: "Actividad registrada manualmente",
		markAsReported: "Marcar como reportado",
		meetingArranged: "Reunión programada",
		meetingCreation: "Creación de reunión",
		meetingResult: "Resultado de la reunión",
		meetingType: "Tipo de reunión",
		newNote: "Nueva nota",
		noteCalendar: "Nota (calendario)",
		noteInternal: "Nota (interna)",
		sendNoteTaker: "Enviar tomador de notas",
		notSendNoteTaker: "No enviar tomador de notas",
		noteTakerRemoveError: "Hubo un error al eliminar su bot ¡por favor intente nuevamente!",
		noteTakerRemoved: "¡Tomador de notas eliminado con éxito!",
		noteTakerSent: "Tomador de notas enviado",
		noteTakerNotSent: "Tomador de notas no enviado",
		noteTakerSentError: "Hubo un error al enviar su bot, ¡por favor intente nuevamente!",
		noteTakerSentOk: "¡Tomador de notas enviado con éxito!",
		opened: "Abierto",
		pin: "PIN",
		reminderSet: "Recordatorio establecido",
		reply: "Responder",
		replyAll: "Resp. todos",
		reportResult: "Reportar resultado",
		reported: "Reportado",
		rescheduledCadence: "Cadencia reprogramada",
		sendAnother: "Enviar otro",
		showDetails: "Mostrar detalles",
		startNewNote: "Empiece a escribir su nueva nota...",
		startedCadence: "Cadencia iniciada",
		stoppedCadence: "Cadencia detenida",
		transcript: {
			backTo: "Volver a detalles de {{type}}",
			cantGenerateCall: "Esta transcripción no se pudo generar porque la llamada no ha durado lo suficiente",
			cantGenerateMeeting: "Esta transcripción no se pudo generar porque la reunión no tiene un bot asociado",
			generate: "Generar",
			generating: "Generando transcripción. Esto podría tardar algunos minutos",
			meetingProcessed: "La reunión aún se está procesando, la transcripción comenzará en unos minutos",
			sentiment: "Sentimiento",
			show: "Transcripción",
			transcription: "Transcripción"
		},
		untitledCompany: "Empresa sin título",
		untitledLead: "Prospecto sin título",
		untitledOpp: "Oportunidad sin título"
	},
	pastActivityFilters: {
		cadence: "Cadencia",
		calls: "Llamadas",
		customTask: "Tarea personalizada",
		emails: "Correos electrónicos",
		inbound: "Actividad entrante",
		linkedin: "LinkedIn",
		meetings: "Reuniones",
		notes: "Notas",
		updates: "Actualizaciones"
	},
	reportedIconButton: {
		tooltipNoPermissions: "No tiene los permisos necesarios para realizar esta acción",
		tooltipNotReported: "No reportado",
		tooltipReported: "Reportado"
	},
	toasts: {
		created: {
			success: "Actividad creada exitosamente",
			error: "Hubo un problema al crear la actividad"
		}
	}
};
var addLeadToActivityModal = {
	assign: "Asignar",
	callout: "Registre este número si desea que las llamadas futuras estén asociadas a este prospecto.",
	cancel: "Cancelar",
	checkbox: " Actualizar también el número de teléfono del lead con el número de llamada",
	title: "Asignar llamada a un prospecto",
	toast: {
		error: "Hubo un problema al asignar el prospecto.",
		success: "¡Prospecto asignado con éxito!"
	}
};
var addToCalendarModal = {
	addToCalendar: "Agregar al calendario",
	header: "Agende una reunión de 30 minutos en su calendario",
	title: "¿Añadir a tu calendario?",
	untitled: "Evento sin título",
	"with": "con"
};
var ai = {
	aiInsights: {
		aiInsights: "Información de IA",
		generating: "Generando",
		refresh: "Actualizar"
	},
	aiAnalysis: {
		aiAnalysis: "Análisis de IA",
		IncomingCall: "Llamada entrante",
		MissedCall: "Llamada perdida",
		OutgoingCall: "Llamada saliente",
		callResult: "Resultado de la llamada",
		leadNumber: "Número de prospecto",
		callDate: "Fecha de la llamada",
		assignedTo: "Asignado a",
		meetingResult: "Resultado de la reunión",
		meetingType: "Tipo de reunión",
		meetingCreation: "Creación de la reunión",
		attendees: "Asistentes",
		play: "Reproducir",
		pause: "Pausa",
		changePlaySpeed: "Cambiar velocidad de reproducción",
		nextSpeaker: "Siguiente orador",
		skipBack: "Retroceder",
		skipForward: "Avanzar",
		seeOnSfdc: "Ver en Salesforce",
		summary: "Resumen",
		transcript: "Transcripción",
		insights: "Ideas",
		activities: "Actividades",
		meetingSummary: "Resumen de la reunión",
		callSummary: "Resumen de la llamada",
		searchTranscript: "Buscar en la transcripción",
		searchTranscriptTooltip: "Buscar en la transcripción...",
		meetingTranscript: "Transcripción de la reunión",
		callTranscript: "Transcripción de la llamada",
		insightsFor: "Ideas para",
		noTranscript: "No se encontraron resultados",
		noTranscriptDescription: "La búsqueda no ha arrojado ningún resultado. Cambie las palabras clave para resaltar coincidencias dentro de la transcripción",
		noInsights: "No se generaron ideas",
		noInsightsDescription: "Revisa tus indicaciones y verifica si el tipo de actividad es el correcto para la actividad actual.",
		noInsightsDescriptionTry: "También puedes intentar generarlas manualmente",
		noInsightsButton: "Regenerar ideas"
	}
};
var assignUserModal = {
	assignAction: "Asignar {{bobjectName}} a otro usuario",
	callout: {
		noSales: "El {{bobjectName}} asignado aparecerá en la pestaña {{tab}}. Si hay tareas pendientes, se asignarán al nuevo propietario.",
		sales: "El {{bobjectName}} se asignará al nuevo propietario. Si hay tareas pendientes, también se reasignarán."
	},
	dropdown: {
		placeholder: "Buscar usuario",
		title: "Reasignar conversación a otro usuario"
	},
	importName: "Actualizar asignatario en {{total}} {{bobjectName}}",
	me: "Asignar a mí",
	other: "Asignar a otro usuario",
	recommendation_a: "'Se recomienda encarecidamente asignar un \n objeto para trabajar con él en Bloobirds.",
	recommendation_b: "Elija a quién desea asignarlo",
	toast: {
		success: "¡Usuarios asignados con éxito!"
	}
};
var bobjectSelector = {
	link: "Enlazar",
	noResultsFound: {
		subtitle: "Prueba con otros términos de búsqueda",
		title: "Sin resultados para “{{searchTerm}}”"
	},
	noSearchYetMessage: "Busca personas, empresas o acuerdos para enlazar a esta nota",
	noSearchYetMessageB2CAccounts: "Busca personas o acuerdos para vincular a esta nota",
	search: "Buscar..."
};
var bobjectTypes = {
	activity: "actividad",
	activity_one: "actividad",
	activity_other: "actividades",
	all: "Todos",
	company: "empresa",
	company_one: "empresa",
	company_other: "empresas",
	contact: "contacto",
	contact_one: "contacto",
	contact_other: "contactos",
	lead: "prospecto",
	lead_one: "prospecto",
	lead_other: "prospectos",
	meeting: "reunión",
	meeting_one: "reunión",
	meeting_other: "reuniones",
	opportunity: "oportunidad",
	opportunity_one: "oportunidad",
	opportunity_other: "oportunidades",
	task: "tarea",
	task_one: "tarea",
	task_other: "tareas"
};
var bobjects = {
	assignToSelector: {
		placeholder: "Buscar",
		userOptions: {
			noResultsSubtitle: "Prueba otros términos",
			noResultsTitle: "No hay resultados para esta búsqueda",
			unnamed: "Sin nombre"
		}
	},
	autoCompleteSearchLeads: {
		noResults: "No se encontraron resultados",
		placeholder: "Buscar leads"
	},
	bobjectForm: {
		emailNotValid: "Dirección de correo electrónico no válida",
		phoneNotValid: "El número de teléfono no es válido.",
		referenceField: {
			companiesPlaceholder: "Buscar empresas",
			createCompany: "Crear empresa {{companyName}}",
			createNewCompany: "Crear nueva empresa {{companyName}}",
			matchingCompany: "Empresa coincidente {{companyName}}",
			noMatchingCompany: "No se encontró ninguna empresa coincidente",
			noResults: "No se encontraron resultados",
			possibleMatch_one: "{{count}} posible coincidencia",
			possibleMatch_other: "{{count}} posibles coincidencias",
			referencedTooltip: "Los leads se guardarán y se asignarán a empresas si se encuentra una coincidencia con el nombre de la empresa en Bloobirds. Si no se puede encontrar el nombre de la empresa, el lead se guardará sin empresa.",
			searchResults: "Resultados de búsqueda"
		},
		requiredMessage: "Este campo es obligatorio"
	},
	bobjectItem: {
		all: "Todos",
		attempts: "Intentos",
		lastAttempt: "Último intento",
		lastTouch: "Último contacto",
		touches: "Contactos"
	},
	bobjectSelector: {
		link: "Enlazar",
		noResultsFound: {
			subtitle: "Prueba otros términos de búsqueda",
			title: "No hay resultados para “{{searchTerm}}”"
		},
		noSearchYetMessage: "Busca personas, empresas o acuerdos para enlazar a esta nota",
		search: "Buscar ..."
	},
	confirmDeleteModal: {
		bulkMessage: "Estás a punto de borrar permanentemente {{count}} {{bobjectType}}.",
		cancel: "Cancelar",
		"delete": "Borrar",
		deleteBulk: "Borrar {{bobjectType}}",
		message: "Estás a punto de borrar permanentemente el {{bobjectType}}\n {{bobjectName}}.",
		subtitle: "<strong>Esta acción no se puede deshacer</strong>, ¿estás seguro de que deseas continuar?",
		title: "Borrar {{bobject}}"
	},
	rescheduleModal: {
		customDateDialog: {
			cancel: "Cancelar",
			send: "Enviar",
			today: "Hoy"
		},
		error: "La cadencia se ha editado y este paso ya no existe, no es posible reprogramar toda la cadencia",
		inOneWeek: "En una semana",
		inTwoDays: "En dos días",
		nextMonday: "Próximo lunes",
		rescheduleWholeCadence: "Reprogramar toda la cadencia",
		selectDateAndTime: "Selecciona fecha y hora",
		title: "Reprogramar tarea",
		tomorrow: "Mañana"
	},
	skipTaskModal: {
		none: "Ninguno",
		placeholder: "Motivos de omisión de la tarea",
		required: "Se requiere un motivo de omisión",
		save: "Guardar",
		subtitle: "Por favor, selecciona un motivo para omitirla",
		title: "Tarea omitida"
	}
};
var brandedButtons = {
	googleSignIn: "Iniciar sesión con Google",
	outlookSignIn: "Iniciar sesión con Outlook"
};
var cadence = {
	cadenceControlModal: {
		assignCadenceDropdown: {
			admin: {
				assignToMe: "Asignar a <strong> mí </strong> y iniciar",
				startCadence: "Iniciar para  <strong>{{name}}</strong>",
				subtitle: "¿Qué deseas hacer?",
				title: "⚠️ Este {{bobjectType}} no está asignado a ti. Las tareas de la cadencia siempre se asignan al propietario actual."
			},
			assignCompany: "Asignar empresa",
			assignCompanyAndLeads: "Asignar empresa y leads",
			assignLead: "Asignar lead",
			assignLeadAndCompany: "Asignar lead y empresa",
			assignStart: "Asignar y empezar",
			noPermissionsTooltip: "No tienes permisos para iniciar una cadencia ya que este {{bobjectType}} no está asignado a ti",
			start: "Iniciar",
			title: "Este {{bobjectType}} debe asignarse para inscribirse en una cadencia. <strong>¿Deseas asignarlo a ti y continuar?</strong>",
			tooltip: "Si la empresa ya está asignada, se reasignará a ti"
		},
		cadenceControl: "Control de cadencia",
		createNextStep: {
			back: "Atrás",
			dueDate: "Fecha",
			placeholder: "Describe tu tarea...",
			save: "Guardar y programar siguiente paso"
		},
		createNextStepTitle: "Crear siguiente paso",
		feedbackStep: {
			accept: "Aceptar",
			subtitle: "🕒 Este proceso puede tardar varios minutos, cierra esta ventana mientras se completa el proceso.",
			title: "Las tareas de la cadencia aparecerán en la pestaña 'En cadencia' en los próximos minutos."
		},
		nextStep: {
			accept: "Aceptar",
			"continue": "Continuar",
			nextStep: {
				message: "Actualmente no hay ninguna cadencia en progreso.",
				title: "¿Qué deseas hacer a continuación?"
			},
			noKeepCadence: "No, continuar",
			radioButtons: {
				configureCadence: "Deseo configurar una nueva cadencia",
				configureCadenceTooltip: "No puedes asignar una cadencia si el {{bobjectType}} no está asignado",
				nextStep: "Deseo programar manualmente un siguiente paso",
				nothingElse: "No deseo hacer nada más"
			},
			stopCadence: {
				message: "La <strong>cadencia {{cadenceName}}</strong> está en progreso actualmente y comenzó el {{cadenceDate}}.",
				title: "¿Deseas detener la cadencia?"
			},
			title: "Control de cadencia para {{bobjectName}}",
			yesStopCadence: "Sí, detener la cadencia"
		},
		selectCadence: "Selecciona la cadencia",
		untitledCompany: "Empresa sin nombre",
		updatesLeadStatus: "Actualizaciones del estado del lead",
		yourTasksAreBeingRescheduled: "Estamos procesando tus tareas"
	},
	cadencePreview: {
		"auto-mail": "Auto-email",
		automatedEmail: "Correo electrónico automatizado",
		call: "Llamada",
		customTask: "Tarea personalizada",
		day: "Día",
		email: "Correo",
		linkedin: "LinkedIn",
		linkedinMessage: "Mensaje de LinkedIn",
		phoneCall: "Llamada telefónica",
		task: "Tarea"
	},
	cadenceSelector: {
		active: "Activo",
		automated: "Automatizado",
		createNewCadence: "Crear una nueva cadencia",
		days: "Días",
		myCadences: "Mis Cadencias",
		noResults: "No hay resultados para tu búsqueda.",
		officialCadences: "Cadencias Oficiales",
		showOnlyMine: "Solo Mis Cadencias",
		showOnlyNurturing: "Solo Cadencias de Nurturing",
		showOnlyOfficial: "Solo Oficiales",
		steps: "Pasos",
		teamCadences: "Cadencias del Equipo",
		view: "Ver"
	},
	cadenceTable: {
		header: {
			allItem: "{{bobjectType}} y todos los leads",
			kindFilter: {
				anyType: "Cualquier tipo",
				attempts: "Intentos",
				incoming: "Entrantes",
				missed: "Perdidos",
				outgoing: "Salientes",
				placeholder: "Tipo",
				touches: "Contactos"
			},
			noCadenceAssigned: "Ninguna cadencia asignada",
			noLeadAssigned: "Ningún lead asignado",
			placeholder: "Cadencia y actividad desde",
			show: "Mostrar",
			timeWindowFilter: {
				daily: "Diario",
				monthly: "Mensual",
				placeholder: "Ventana de tiempo",
				weekly: "Semanal"
			},
			today: "Hoy",
			unnamedCadence: "Cadencia sin nombre"
		},
		timetable: {
			column: {
				today: "Hoy"
			},
			components: {
				"auto-mail": "Automáticos",
				call: "Llamada",
				email: "Correo",
				firstActivity: "Primera actividad",
				firstCadenceDay: "Primer día de cadencia",
				inbound: "Entrante",
				lastActivity: "Última actividad",
				lastCadenceDay: "Último día de cadencia",
				linkedin: "LinkedIn",
				meeting: "Reunión",
				statusChange: "C. de estado",
				task: "Tarea"
			}
		}
	},
	configureCadence: {
		back: "Atrás",
		bottomCallout: "Si seleccionas una fecha pasada, solo se programarán las tareas de hoy y las futuras. Si deseas programar todas las tareas de la cadencia, selecciona una fecha futura o de hoy.",
		bulkInfo: "La cadencia seleccionada reemplazará la cadencia predeterminada.",
		cadence: "Cadencia",
		datePlaceholder: "Fecha de inicio de la cadencia *",
		leadStatusCallout: "Si provienen de los estados previos de Nuevo, Backlog y Entregado, tanto el <strong>lead como su empresa</strong> (si está disponible) cambiarán al estado <strong>en prospección</strong>.",
		none: "Ninguna",
		placeholder: "Cadencia de {{bobjectType}} *",
		recommendedStage: "¡Esta es tu cadencia recomendada de {{stage}}!",
		selectDateInfo: "Selecciona una fecha para continuar.",
		start: "Iniciar",
		startCadenceDateInfo: "Recuerda cambiar la fecha de inicio de la cadencia para iniciar una nueva cadencia",
		title: "¿Qué cadencia deseas utilizar?",
		toast: "Cadencia iniciada para el {{bobjectType}}",
		topCallout: "Esta cuenta no tiene cadencias para leads.<br> <0>Ve a Mi Playbook ></0> <1>{{cadence}}</1> <2>para configurar tu primera.</2>"
	},
	hooks: {
		stopErrorToast: "Se produjo un error al detener la cadencia, ¡por favor, inténtalo de nuevo!",
		stopSuccessToast_one: "La cadencia se ha detenido con éxito",
		stopSuccessToast_other: "Las cadencias se han detenido con éxito"
	},
	previewTemplateModal: {
		title: "Vista previa del correo electrónico: "
	},
	rescheduleCadence: {
		customDateDialog: {
			cancel: "Cancelar",
			send: "Enviar",
			today: "Hoy"
		},
		error: "Esta cadencia no permite ser reprogrmada debido a su configuración. Consulte con su administrador",
		inOneWeek: "En una semana",
		inTwoDays: "En dos días",
		nextMonday: "Próximo lunes",
		rescheduleWholeCadence: "Reprogramar toda la cadencia",
		selectDateAndTime: "Selecciona fecha y hora",
		title: "Reprogramar cadencia",
		subtitle: "La tarea y la cadencia se reprogramaran a la fecha seleccionada",
		nextStepIn: "Siguiente paso el:",
		tomorrow: "Mañana"
	},
	stopCadenceModal: {
		cancel: "Cancelar",
		message: "Estás a punto de <strong>detener la cadencia de este {{bobjectTypes}}</strong><br> <strong>Esta acción no se puede deshacer, ¿estás seguro de que deseas continuar?</strong>",
		messageBulk: "Estás a punto de <strong>detener la cadencia de {{count}} {{bobjectTypes}}</strong><br> <strong>Esta acción no se puede deshacer, ¿estás seguro de que deseas continuar?</strong>",
		stopCadence: "Detener cadencia",
		stopCadence_one: "Detener cadencia",
		stopCadence_other: "Detener cadencia"
	}
};
var calendar = {
	banner: {
		create: "Selecciona horas arrastrando en tu calendario para compartirlas con otros",
		edit: "Editar horas. Elimina o agrega nuevas horas a la selección actual",
		past: "No puedes proponer horas en fechas u horas pasadas"
	},
	cannotCreatePastSlots: "No puedes ofrecer horas ya pasadas",
	description: "Agrega un intervalo de tiempo haciendo clic y arrastrando en el calendario.",
	discardChanges: "Descartar cambios",
	events: {
		attendee_one: "{{count}} asistente",
		attendee_other: "{{count}} asistentes",
		close: "Cerrar selección de horas",
		closeConfirmation: "Los intervalos seleccionadas no se guardarán. <b>Esta acción no se puede deshacer</b>. ¿Estás seguro de que quieres continuar?"
	},
	meetingDuration: "Duración",
	meetingTitlePlaceholder: "Agregar título de la reunión...",
	minutes: "mins",
	selectTimeBelow: "Selecciona una hora por debajo de la línea roja o una fecha futura",
	selectedSlots: "Horas seleccionadas"
};
var callDetail = {
	noCallRecordingMessage: "No hay grabación disponible"
};
var captureSalesforce = {
	confirmationModal: {
		cancel: "Cancelar",
		contentText: "El {{sobjectType}} relacionado <strong>está asignado a {{assignedName}}</strong>, si lo sincroniza en Bloobirds, la asignación permanecerá igual y las tareas y notificaciones se asignarán al usuario asignado.",
		"continue": "Continuar y sincronizar",
		object: "objeto",
		sync: "Sincronizar"
	}
};
var changeStatusModal = {
	assignedTo: {
		Activity: "¿A qué usuario desea asignar esta actividad?",
		Company: "¿A qué usuario desea asignar esta empresa?",
		Lead: "¿A qué usuario desea asignar este prospecto?",
		Opportunity: "¿A qué usuario desea asignar esta oportunidad?",
		Task: "¿A qué usuario desea asignar esta tarea?",
		placeholder: "Asignado a {{required}}"
	},
	modalTitle: "Actualizar estado de {{bobjectType}}",
	reasonedStatus: {
		placeholder: "{{bobjectType}} motivo de {{selectedStatus}}{{required}}",
		title: "¿Cuál es la razón del cambio de estado?"
	},
	stopCadenceWarning: "¡Este estado seleccionado detendrá la cadencia!",
	title: {
		Activity: "¿Desea actualizar el estado de la actividad?",
		Company: "¿Desea actualizar el estado de la empresa?",
		Lead: "¿Desea actualizar el estado del prospecto?",
		Opportunity: "¿Desea actualizar el estado de la oportunidad?",
		Task: "¿Desea actualizar el estado de la tarea?"
	},
	unassignedWarning: "El estado seleccionado dejará el {{bobjectType}} sin asignar."
};
var changeTzModal = {
	africa: "África",
	america: "América",
	antartica: "Antártica",
	asia: "Asia",
	australia: "Australia",
	change: "Guardar",
	europe: "Europa",
	myTimezone: "Mi zona horaria",
	title: "Cambiar zona horaria"
};
var emailTemplatePage = {
	modal: {
		title: "¿Qué tipo de plantilla deseas crear?",
		description: "Escoge una de las siguientes opciones para crear una plantilla de correo electrónico",
		bloobirdsTemplateDescription: "Nuestro editor visual te permite usar variables, links de calendario y muchas más herramientas para personalizar tus plantillas",
		htmlTemplateDescription: "Un editor de HTML básico que te permite copiar y pegar código HTML para usar tus plantillas de marketing"
	}
};
var common = {
	Activities: "Actividades",
	Emails: "Correos electrónicos",
	LinkedIn: "LinkedIn",
	Overview: "Resumen",
	Pitches: "Discursos de venta",
	Playbook: "Playbook",
	QQs: "Preguntas de calificación",
	Relations: "Relaciones",
	Tasks: "Tareas",
	accept: "Aceptar",
	account: "Cuenta",
	accountExecutive_one: "Ejecutivo de cuentas",
	accountExecutive_other: "Ejecutivos de cuentas",
	activeCampaign: "Active Campaign",
	activity: "Actividad",
	activity_other: "Actividades",
	add: "Agregar",
	aircall: "Aircall",
	all: "Todos",
	allValuesSelected: "Todos los valores seleccionados",
	assign: "Asignar",
	assignedTo: "Asignado a",
	astroline: "Astroline",
	automation: "Automatización",
	automation_other: "Automatizaciones",
	back: "Volver",
	bloobirds: "Bloobirds",
	bubble: "Bubble",
	buyerPersona: "Persona compradora",
	buyerPersona_other: "Personas compradoras",
	cadence: "Cadencia",
	cadenceByDefault: "Cadencia por defecto",
	cadence_other: "Cadencias",
	call: "Llamada",
	callWith: "Llamada con",
	cancel: "Cancelar",
	category: "Categoría",
	category_other: "Categorías",
	checkYour: "Verifica tu",
	clear: "Limpiar",
	close: "Cerrar",
	closed: "cerrado",
	collapse: "Colapsar",
	company: "Empresa",
	company_one: "Empresa",
	company_other: "Empresas",
	complete: "Completar",
	completed: "Completado",
	confirm: "Confirmar",
	contact: "Contacto",
	"continue": "Continuar",
	copilot: "Copiloto",
	create: "Crear",
	creationDate: "Fecha de creación",
	customTask: "Tarea personalizada",
	customTask_other: "Tareas personalizadas",
	dashboard_one: "Analítica",
	dashboard_other: "Analíticas",
	date: "Fecha",
	day: "Día",
	day_other: "Días",
	daysAgo: "Hace {{days}} días",
	"delete": "Eliminar",
	description: "Descripción",
	discard: "Descartar",
	dismiss: "Descartar",
	dynamics: "Dynamics",
	edit: "Editar",
	email: "Correo electrónico",
	emailTemplate: "Plantilla de correo electrónico",
	emailTemplate_other: "Plantillas de correo electrónico",
	ended: "Finalizado",
	expand: "Expandir",
	failed: "Error",
	fieldRequired: "Este campo es obligatorio",
	from: "de",
	generalSettings: "Configuración general",
	generating: "Generando",
	goBack: "Volver",
	goSafety: "Volver",
	highPriority: "Alta prioridad",
	hour: "Hora",
	hour_other: "Horas",
	hubspot: "Hubspot",
	important: "Importante",
	inDays: "En {{days}} días",
	justcall: "JustCall",
	kpis: "KPIs",
	last_visited: "Visitados recientemente",
	lead: "Prospectos",
	lead_other: "Prospectos",
	learnMore: "Más información",
	less: "menos",
	link: "Linkar",
	linkedInTemplate: "Plantilla de LinkedIn",
	linkedInTemplate_other: "Plantillas de LinkedIn",
	logout: "Cerrar sesión",
	meetingArranged: "Reunión programada",
	meetingLinks: "Reuniones",
	meetingWith: "Reunión con",
	messagingSegmentation: "Segmentación de mensajes",
	minimise: "Minimizar",
	minute: "Minuto",
	minute_other: "Minutos",
	more: "más",
	name: "Nombre",
	never: "Nunca",
	"new": "Nuevo",
	noPriority: "Sin prioridad",
	noResultsFound: "Sin resultados",
	noSubject: "Sin asunto",
	none: "Ninguno",
	note: "Nota",
	notPrintable: "No printable",
	numintec: "Numintec",
	ok: "Aceptar",
	open: "Abrir",
	openInNewTab: "Más detalles",
	opportunity: "Oportunidad",
	opportunity_other: "Oportunidades",
	overdue: "Vencido",
	phone: "Teléfono",
	pipedrive: "Pipedrive",
	pitch: "Discurso de venta",
	pitch_other: "Discursos de venta",
	preview: "Previsualizar",
	product: "Producto",
	product_other: "Productos",
	prospecting: "Prospección",
	prospectingAbr: "Pr",
	qualifyingQuestion: "Pregunta de calificación",
	qualifyingQuestion_other: "Preguntas de calificación",
	recording: "Grabación",
	refresh: "Actualizar",
	remove: "Eliminar",
	report: "Informe",
	reportResult: "Reportar",
	report_other: "Informes",
	reschedule: "Reprogramar",
	rescheduled: "Reprogramado",
	retrieving: "Recuperando",
	sales: "Ventas",
	salesAbr: "Sa",
	salesPipeline: "Pipeline de ventas",
	salesforce: "Salesforce",
	save: "Guardar",
	scenario: "Escenario",
	scenario_other: "Escenarios",
	search: "Buscar",
	searchLeads: "Buscar prospectos",
	segmentation: "Segmentación",
	select: "Seleccionar",
	selected: "Seleccionado",
	setCadence: "Establecer cadencia",
	settings: "Configuraciones",
	show: "Mostrar",
	showAll: "Mostrar todo",
	showDisabled: "Mostrar deshabilitados",
	showDisabledWorkflowsTooltip: "Todas las automatizaciones están desactivados, no se puede desactivar esta opción",
	sidePeek: "Vista lateral",
	skip: "Omitir",
	snippet: "Fragmento",
	snippet_other: "Fragmentos",
	somethingWentWrong: "Algo salió mal",
	somethingWentWrongDescription: "La página a la que intentas acceder no existe",
	stage: "Etapa",
	started: "comenzó",
	status: "Estado",
	statusUpdate: "Actualizar estado",
	stop: "Detener",
	stopped: "Detenido",
	subject: "Asunto",
	successfullyDeleted: "eliminado con éxito",
	targetMarket: "Mercado objetivo",
	targetMarket_other: "Mercados objetivo",
	task: "Tarea",
	taskAndReminders: "Tareas y recordatorios",
	task_other: "Tareas",
	templatesAndSnippets: "Plantillas y fragmentos",
	to: "A",
	today: "Hoy",
	tomorrow: "Mañana",
	transcript: "Transcripción",
	twilio: "Twilio",
	untitledEvent: "Evento sin título",
	user: "Usuario",
	user_other: "Usuarios",
	vtiger: "Vtiger",
	welcome: "Bienvenido",
	whatsapp: "WhatsApp",
	whatsappTemplate: "Plantilla de WhatsApp",
	whatsappTemplate_other: "Plantillas de WhatsApp",
	"with": "Con",
	yes: "Sí",
	yesterday: "Ayer",
	you: "Tú",
	zoho: "Zoho"
};
var confirmCloseModal = {
	cancel: "Cancelar",
	close: "Cerrar",
	discard: "Descartar",
	subtitle: "<strong>Esta acción no se puede deshacer</strong>, ¿estás seguro de que deseas continuar?",
	title: "Ya has completado alguna información en tu nuevo {{type}}"
};
var contactFlowModal = {
	statusNoteActions: {
		buttons: {
			back: "Atrás",
			manageTasks: "Gestionar tareas",
			finishReporting: "Finalizar reporte"
		},
		header: {
			saved: "Guardado!"
		},
		statusColumn: {
			header: "Actualizar estado",
			description: "¿Quieres actualizar el estado de la {{bobjectType}}?"
		},
		toasts: {
			updateSalesforceSuccess: "¡Estado actualizado con éxito!",
			updateSalesforceError: "Ha habido un error en la actualización {{error}}",
			noteSuccess: "¡Nota guardada con éxito!",
			errorUpdatingNote: "Ha habido un error actualizando la nota, por favor inténtelo de nuevo"
		},
		updateRelatedStatus: "Actualiza el estado del objeto relacionado",
		noteColumn: {
			header: "Nota de {{activityType}}",
			description: "¿Hay algo mas que necesites recordar de esta {{activityType}}?",
			placeholder: "Empieza a escribir tu nueva nota...",
			call: "llamada",
			meeting: "reunión"
		},
		quickActionColumn: {
			header: "Acciones rápidas",
			description: "¿Hay algo más que necesites hacer?",
			actionCard: {
				completeCurrentTask: "Completa la tarea en curso",
				email: {
					title: "Email",
					hasTask: "Tienes una tarea incompleta de mandar un email al contacto",
					noTask: "Manda un nuevo email al contacto"
				},
				whatsapp: {
					title: "WhatsApp",
					hasTask: "Tienes una tarea incompleta de mandar un mensaje de whatsapp al contacto",
					noTask: "Abre whatsapp y manda un mensaje nuevo al contacto"
				},
				task: {
					activeTitle: "Crea un próximo paso",
					completedTitle: "Tarea creada ✨",
					hasTask: "Crea una nueva tarea para seguir en contacto con tu prospecto",
					noTask: "¡Ahora puedes seguir conectado sin olvidar nada!"
				}
			}
		}
	},
	callResult: {
		back: "Atrás",
		callInfo: {
			title: "{{direction}} llamada <strong>{{phone}}</strong> a las <strong>{{date}}</strong> <0>{{leadName}} {{companyName}}</0>"
		},
		incoming: "Entrante",
		missed: "Perdida",
		noAnswer: {
			endCall: "Finalizar el flujo de informe de llamada aquí",
			hint: "Esto se puede cambiar en cualquier momento."
		},
		outgoing: "Saliente",
		pitchUsed: {
			placeholder: "Presentación / Fragmento utilizados",
			title: "¿Pudiste realizar tu presentación?"
		},
		save: "Guardar",
		saveAndContinue: "Guardar y continuar",
		skip: "Saltar",
		title: "¿Cuál es el resultado de la llamada?",
		updateNumbers: {
			information: "{{bobjectName}} Información",
			title: "¿Deseas actualizar alguno de los números registrados?"
		}
	},
	callResultOpp: {
		addInfo: "¿Quieres agregar alguna información?",
		addNote: "Agregar una nota",
		back: "Atrás",
		next: "Siguiente",
		no: "No",
		notePlaceholder: "Empieza a escribir tu nueva nota...",
		skip: "Saltar",
		title: "¿Has podido contactar?*",
		yes: "Sí"
	},
	changeSalesStatus: {
		back: "Atrás",
		placeholder: "{{lead}} {{status}} motivo",
		save: "Guardar",
		saveAndContinue: "Guardar y continuar",
		skip: "Saltar",
		title: "¿Quieres actualizar el estado de {{bobject}}?",
		whatReason: "¿Cuál es el motivo del cambio de estado?"
	},
	changeStatus: {
		back: "Atrás",
		cancel: "Cancelar",
		companiesStatusMessage: "<strong>El estado de la empresa seleccionado detendrá la cadencia.</strong> Toda comunicación futura debe programarse manualmente y debe basarse en lo que discutiste durante tu llamada.",
		leadStatusTexts: {
			LEAD__STATUS__CONTACT: "Necesito crear una oportunidad o revisar una existente",
			LEAD__STATUS__CONTACT_NO_CREATE_LEAD: "El lead es un nuevo contacto para crear una futura oportunidad",
			LEAD__STATUS__CONTACTED: "Me puse en contacto con el lead, pero aún no están interesados",
			LEAD__STATUS__DISCARDED: "Debo dejar de contactar al lead y descartarlo",
			LEAD__STATUS__ENGAGED: "Me puse en contacto con el lead, ¡están interesados!",
			LEAD__STATUS__MEETING: "El lead aceptó una reunión y necesito programarla",
			LEAD__STATUS__NURTURING: "Debo dejar de contactar al lead y volver a intentarlo en el futuro",
			LEAD__STATUS__ON_PROSPECTION: "No pude contactar al lead todavía y quiero seguir intentándolo"
		},
		placeholder: "{{bobject}} {{status}} motivo",
		save: "Guardar",
		saveAndContinue: "Guardar y continuar",
		skip: "Saltar",
		toasts: {
			success: "¡Estado actualizado con éxito!"
		},
		tooltipDictionary: {
			COMPANY__STATUS__CONTACTED: "Utilizado cuando tienes un contacto correcto. Te has puesto en contacto con la persona adecuada",
			COMPANY__STATUS__DISCARDED: "Utilizado cuando las preguntas de calificación indican que la empresa no es un cliente potencial. Esto cambiará el estado de todos los leads dentro de la empresa a Descartado",
			COMPANY__STATUS__ENGAGED: "Utilizado cuando uno de los leads tiene el estado Comprometido. El estado de la empresa cambia en consecuencia.",
			COMPANY__STATUS__MEETING: "Utilizado cuando programas una reunión entre un lead y el ejecutivo de cuentas",
			COMPANY__STATUS__NURTURING: "Utilizado cuando no ha sido posible contactar a ningún lead dentro del período de la cadencia. Esto cambiará el estado de todos los leads dentro de la empresa a Nurturing",
			DEFAULT_TEXT: "El estado del lead y la empresa están estrechamente relacionados, por lo tanto, dependiendo del estado del lead seleccionado, el estado de la empresa también puede cambiar",
			HEADER_TEXT: "El estado del lead y la empresa están estrechamente relacionados, por lo tanto, dependiendo del estado del lead seleccionado, el estado de la empresa también puede cambiar",
			LEAD__STATUS__CONTACTED: "Utilizado cuando te has puesto en contacto con el lead",
			LEAD__STATUS__DISCARDED: "Utilizado cuando el lead no es un contacto adecuado para continuar prospectando",
			LEAD__STATUS__ENGAGED: "Utilizado cuando el lead está interesado y ha respondido las preguntas de calificación",
			LEAD__STATUS__MEETING: "Utilizado cuando has programado una reunión entre el lead y el ejecutivo de cuentas",
			LEAD__STATUS__NURTURING: "Utilizado cuando no has podido contactar al lead dentro del período de la cadencia pero deseas intentarlo de nuevo más tarde"
		},
		whatReason: "¿Cuál es el motivo del cambio de estado?"
	},
	notesAndQQ: {
		addNote: "Agregar una nota",
		back: "Atrás",
		fillQQ: "Completa las preguntas de calificación",
		none: "Ninguna",
		notePlaceholder: "Empieza a escribir tu nueva nota...",
		saveAndContinue: "Guardar y continuar",
		skip: "Saltar",
		title: "¿Cómo fue la llamada?"
	},
	scheduleNextSteps: {
		assignedTo: "Asignado a",
		back: "Atrás",
		dueDate: "Fecha",
		placeholder: "Describe tu tarea... ",
		saveAndSchedule: "Guardar y programar el próximo paso",
		skip: "Saltar"
	},
	titles: {
		callResult: "Informe del resultado de la llamada",
		callResultOpp: "Informe del resultado de la llamada",
		changeSalesStatus: "",
		changeStatus: "Actualizar el estado y decidir el siguiente paso",
		convertObject: "Enviar a ventas",
		crmUpdates: "Actualizaciones del CRM",
		initial: "",
		notesAndQQs: "Informe del resultado de la llamada",
		opportunityControl: "Control de oportunidades",
		scheduleNextSteps: "Crear el próximo paso"
	}
};
var copyText = {
	copied: "Copiado! ✨",
	copyToClipboard: "Copiar al portapapeles"
};
var crmUpdatesModal = {
	accept: "Aceptar",
	acceptAllSuggestions: "Aceptar todas las sugerencias",
	acceptSuggestion: "Aceptar sugerencia",
	cancel: "Cancelar",
	confirm: "Confirmar",
	confirmUpdatesModal: {
		doYouWishToContinue: "¿Deseas continuar?",
		field: "campo",
		fields: "campos",
		title: "Confirmar Actualizaciones de CRM",
		youCanGoBack: "Puedes retroceder y realizar más cambios que puedas haber pasado por alto. Cualquier otro cambio se hará manualmente después.",
		youreAboutToMakeChangesTo: "Estás a punto de realizar cambios en:"
	},
	current: "Actual",
	discard: "Descartar",
	discardAllSuggestions: "Descartar todas las sugerencias",
	discardSuggestion: "Descartar sugerencia",
	discardUpdatesModal: {
		doYouWishToContinue: "¿Deseas continuar?",
		field: "campo",
		fields: "campos",
		ifYouDiscard: "Si descartas los cambios, <strong>perderás todo el progreso</strong> hasta este punto.",
		title: "Descartar Actualizaciones de CRM"
	},
	entity: {
		all: "Todos",
		account: "Cuenta",
		Contact: "Contacto",
		Opportunity: "Opportunidad"
	},
	"new": "Nuevo",
	reset: "Restablecer",
	suggestAllAgain: "Sugerir todo de nuevo",
	title: "Actualizaciones de CRM Sugeridas por IA",
	updates: "Actualizaciones de {{entity}}"
};
var dates = {
	monthShortWithTime: "{time-24} {date} {month-short}",
	shortDayMonth: "{date} de {month-short}, {day}",
	shortMonth: "{date} {month-short}",
	shortMonthFullDate: "{date} {month-short} {year}, {time}",
	shortYear: "{date} {month-short}, {year}",
	standardDate: "{date} {month} {year}"
};
var dayCalendar = {
	calendarTips: "Consejos",
	calendars: "Calendarios",
	shareSlots: "Proponer horas",
	today: "Hoy "
};
var detailedActivity = {
	expandedBoxSection: {
		callDate: "Fecha de la llamada",
		callDuration: "Duración de la llamada",
		callReported: "Llamada reportada",
		callResult: "Resultado de la llamada",
		leadNumber: "Número de prospecto",
		noteAction: "Nota (interna)",
		userNumber: "Número de usuario"
	}
};
var dialer = {
	addNote: "Agregar nota",
	dial: {
		action: "Ingrese un número o busque empresas o prospectos...",
		emptySearch_a: "No encontramos ninguna coincidencia para su búsqueda 🔍",
		emptySearch_b: "Por favor, inténtelo de nuevo con un nombre o teléfono diferente",
		mainNumber: "Principal",
		noMatch: "El número no coincide con ninguna empresa o prospecto",
		setAPhone: "Configure una cuenta telefónica para habilitar la función de llamada"
	},
	dialer: "Marcador",
	direction: {
		incoming: "Entrante",
		outgoing: "Saliente",
		title: "Dirección de la llamada"
	},
	extendedScreen: {
		autoOpen: "Abrir automáticamente al iniciar una llamada",
		onlyAdminCanEditTemplate: "Solo el Propietario o un Administrador puede editar esta plantilla",
		note: "Notas de la llamada"
	},
	hints: {
		buildingDialer: "Construyendo el marcador...",
		callEnded: "Llamada finalizada",
		callInProgress: "Llamada en progreso",
		connecting: "Conectando...",
		connectionError: "Error de conexión",
		connectionProblems: "¿Tiene problemas de conexión? Revise la configuración del marcador.",
		help: "Aprenda cómo comenzar a llamar con Bloobirds.",
		incomingCall: "Llamada entrante",
		invalidToken: "Token no válido",
		invalidToken_explanation: "El marcador no está configurado correctamente o la cuenta no es válida",
		logManually: "Siempre puede registrar llamadas manualmente.",
		make: "Hacer una llamada",
		noConfig: "No puede llamar porque su cuenta no está configurada.",
		onCall: "En llamada",
		onlyAdmins: "Solo los administradores pueden configurar la cuenta.",
		readyToCall: "Listo para llamar",
		reconnecting: "Intentando reconectar...",
		ringing: "Llamando...",
		unstableConnection: "Conexión inestable..."
	},
	logCall: {
		button: "Registrar",
		title: "Registrar",
		toast: {
			success: "¡Llamada registrada con éxito!"
		}
	},
	logCallModal: {
		date: "Fecha de la llamada",
		phoneNumber: "Número del contacto",
		title: "Registrar llamada manual",
		yourPhoneNumber: "Tu teléfono"
	},
	note: "Nota",
	notePlaceholder: "Comienza a escribir tu nota aquí...",
	pitch: "Discurso",
	tooltips: {
		cannotClose: "No puede cerrar el marcador mientras está en una llamada.",
		close: "Cerrar marcador",
		minimize: "Minimizar marcador"
	},
	yourPhoneNumber: "Su número de teléfono"
};
var emailModal = {
	bcc: "Bcc:",
	bodyPlaceholder: "Escribe tu correo electrónico aquí...",
	cc: "Cc:",
	createTemplate: "Crear plantilla",
	discard: "Descartar",
	emailScheduled: "Correo electrónico programado para el {{date}}. <0>Haz clic aquí</0> para cancelarlo.",
	emptyConnection: "Necesitas tener un correo electrónico conectado para enviar correos desde Bloobirds. Ve a <1>Configuración</1> para conectar tu correo electrónico.",
	from: "De:",
	noEmailsConnectedYet: "Aún no hay correos electrónicos conectados",
	preview: "Ver",
	saveTemplate: "Guardar como plantilla",
	schedule: "Programar",
	send: "Enviar",
	subjectNewEmail: "Nuevo correo electrónico",
	subjectPlaceholder: "Asunto",
	to: "Para:",
	missingSubject: "Introduzca un asunto para enviar el correo",
	toasts: {
		delay: "El envío del correo electrónico tuvo un breve retraso 😞. Por favor, compruebe si se envió correctamente.",
		disconnected: "Tu conexión de correo electrónico se ha detenido y necesita ser reconectada. Verifícala en la configuración de tu usuario.",
		error: "Ocurrió un problema al enviar el correo electrónico. Por favor, inténtalo de nuevo más tarde.",
		fileExceedSize: "El archivo que estás intentando enviar supera el tamaño máximo permitido.",
		scheduleAction: "Ver correo",
		scheduled: "Correo electrónico programado para el {{date}}",
		scheduledCancelled: "La programación del correo electrónico ha sido cancelada y eliminada con éxito",
		scheduledCancelledError: "Ocurrió un problema al intentar cancelar el correo electrónico programado. Por favor, inténtalo de nuevo más tarde.",
		scheduledError: "Ocurrió un problema al intentar programar el correo electrónico. Por favor, verifica que todos los campos estén completos correctamente.",
		success: "¡Correo electrónico enviado correctamente!",
		errorVariable: "No se ha podido enviar el correo electrónico porque el campo {{variable}} no se puede rellenar.",
		errorVariableGeneric: "No se ha podido enviar el correo electrónico porque hay campos sin rellenar.",
		errorEmailTo: "El correo electrónico no se puede enviar sin un destinatario",
		errorSubject: "El correo electrónico no se puede enviar sin un asunto"
	}
};
var en = "Inglés 🇬🇧";
var es = "Español 🇪🇸";
var extendedScreen = {
	bobjectDetail: {
		contactDetails: "Detalles de contacto",
		newEmail: "Nuevo correo",
		outdatedInfo: "Refrescar",
		sectionField: {
			copied: "¡Copiado!✨",
			copyToClipboard: "Copiar al portapapeles",
			edit: "Editar",
			save: "Guardar"
		},
		sections: {
			companyDetails: "Detalles de la empresa",
			companyEmails: "Correos electrónicos de la empresa",
			companyLinkedIn: "LinkedIn de la empresa",
			companyPhones: "Teléfonos de la empresa",
			emails: "Correos electrónicos",
			linkedIn: "LinkedIn",
			phones: "Teléfonos"
		},
		validation: {
			email: "El formato del correo electrónico no es válido",
			notEmpty: "El campo no puede estar vacío",
			phone: "El número de teléfono no es válido",
			url: "El formato de la URL no es válido"
		}
	},
	contactViewFields: {
		availableFields: "Campos disponibles para mostrar",
		searchText: "Buscar, encontrar y eliminar cualquier campo que desee mostrar en la lista de datos",
		selectFieldsFrom: "Seleccionar campos de"
	},
	header: {
		close: "Cerrar",
		switchToDraggable: "Cambiar a arrastrable",
		syncIssues: "Error al sincronizar",
		syncIssuesMessage: "Este {{type}} no pudo sincronizarse con su CRM. Verifique la configuración de sincronización con su <strong>administrador</strong> para revisar este problema.",
		syncIssuesMessageAdmin: "Este {{type}} no pudo sincronizarse con su CRM. Verifique los <strong>registros</strong> y la configuración de <strong>sincronización</strong> para resolver este problema.",
		viewLogs: "Ver registros"
	},
	relationObjectDetails: {
		searchPlaceholder: "Buscar campos...",
		searchHelp: "Filtrar campos por nombre",
		noResults: "No hay resultados para '{{searchText}}'",
		tryOtherSearch: "Prueba con otros términos de búsqueda",
		openInSalesforce: "Salesforce"
	},
	templateDetail: {
		author: "Autor",
		battleCard: "Tarjeta de batalla",
		headerButtons: {
			edit: "Editar",
			editInBloobirds: "Editar en Bloobirds",
			openInLinkedin: "Abrir en LinkedIn",
			openInWhatsapp: "Abrir en WhatsApp",
			noPhoneNumber: "Añadir un nº de teléfono para usar las plantillas",
			send: "Enviar",
			sendEmail: "Enviar correo electrónico",
			userCantEdit: "Solo el propietario o un administrador pueden editar esta plantilla"
		},
		official: "Plantilla oficial del libro de jugadas",
		"private": "Privado",
		"public": "Público",
		usedInXCadences: "Usada en {{count}} cadencias",
		metrics: {
			clickRate: "Tasa de clics",
			openRate: "Tasa de apertura",
			replyRate: "Tasa de respuesta",
			timesDelivered: "Veces entregado"
		}
	}
};
var extension = {
	errorHandling: {
		title: "Parece que algo salió mal...",
		subtitle: "Nuestro equipo ha sido notificado. Si desea ayudar, díganos qué sucedió a continuación.",
		toasts: {
			success: "¡Comentarios enviados con éxito!",
			error: "Algo salió mal al enviar los comentarios"
		},
		form: {
			title: "Envíenos sus comentarios",
			validation: {
				required: "Este campo es obligatorio",
				commentLength: "Comentario demasiado largo, puede agregar un máximo de 250 palabras"
			},
			namePlaceholder: "Su nombre",
			emailPlaceholder: "Su correo electrónico",
			commentsPlaceholder: "Hice clic en 'X' y luego presioné 'Confirmar...",
			maxWords: "{{count}}/250 palabras"
		},
		submit: "Enviar",
		backToSafety: "Volver al inicio"
	},
	syncBBButtons: {
		addToCadence: "Añadir a cadencia",
		syncIn: "Sync en "
	},
	salesforceToasts: {
		activityNotFound: "No se ha encontrado la actividad en Bloobirds"
	},
	bulkActionsToast: {
		bulkAction: "Progreso de la acción masiva:",
		completed: "Completado ✨",
		forNObjects: "para {{count}} objetos",
		startingListBulk: "Iniciando acción masiva de lista..."
	},
	buyerPersonaAffinity: {
		generating: "Generando",
		refresh: "Actualizar",
		title: "Afinidad con del perfil"
	},
	card: {
		assignTo: "Asignar a",
		assignToLead: "Asignar al prospecto",
		bobjectNameUndefined: "{{bobjectType}} sin título",
		buyerPersona: "Persona compradora",
		call: "Llamar",
		callAgain: "Llamar",
		callBack: "Llamar",
		cancel: "Cancelar",
		companySource: "Fuente de la empresa",
		conversationWith: "Conversación con",
		copilotAnalysis: "Tiene análisis de IA",
		editMail: "Editar correo",
		editTaskButton: "Editar tarea",
		empty: "VACÍO",
		inviteeStatus: {
			maybe: "Tal vez",
			no: "No",
			noReply: "Esperando",
			yes: "Sí"
		},
		invitees_one: "{{count}} invitado",
		invitees_other: "{{count}} invitados",
		join: "Unirse a {{value}}",
		leadAssignment: "Asignación de prospecto",
		leadEmail: "Correo electrónico del prospecto",
		leadSource: "Fuente del prospecto",
		markAsDone: "Reportar",
		markAsDoneAttempt: "Hacer al menos un intento para marcar como completado",
		markAsDoneFuture: "Esta es una tarea para el futuro. No puedes marcarla como completada.",
		markAsDoneOverdue: "Cuando completes esta tarea, se marcará como Completada con retraso",
		markAsImportant: "Marcar como importante",
		markAsRead: "Leído",
		markAsReported: "Reportar",
		messageNotParse: "El mensaje no pudo ser analizado en Bloobirds",
		navigateLinkedinErrorTooltip: "No hay URL de LinkedIn para navegar",
		navigateLinkedinTooltip: "Ir a la URL de LinkedIn",
		navigateSalesforceTooltip: "Ir al registro de Salesforce",
		nextStep: "Próximo paso",
		noPermissions: "No tienes permisos para realizar acciones en esta {{bobject}}",
		noSalesforceIdCompany: "No se encontró ID de Salesforce para esta empresa.",
		noSalesforceIdLead: "No se encontró ID de Salesforce para este prospecto.",
		noSalesforceIdOpportunity: "No se encontró ID de Salesforce para esta oportunidad.",
		notReportedMessages: "Mensajes no reportados",
		numberOfLeads: "Nº de prospectos",
		openLinkedin: "Abrir en LinkedIn",
		openLinkedinSalesNav: "Abrir en Sales Navigator",
		opportunityAmount: "Monto de la oportunidad",
		read: "Leer",
		reassign: "Reasignar",
		reply: "Responder",
		replyAll: "Resp a todos",
		reportCall: "Informar llamada",
		reschedule: "Reprogramar",
		rescheduleTask: "Reprogramar tarea",
		retry: "Reintentar",
		sendNow: "Enviar ahora",
		skipTask: "Omitir tarea",
		targetMarket: "Mercado objetivo",
		toasts: {
			changesSaved: {
				success: "Cambios guardados exitosamente"
			}
		},
		unmarkAsImportant: "Desmarcar como importante"
	},
	draggableTopBar: {
		close: "Cerrar",
		minimise: "Minimizar",
		"switch": "Cambiar a extendido"
	},
	login: {
		emailPlaceholder: "Correo electrónico",
		failed: "Tu intento de inicio de sesión falló. Asegúrate de que tus credenciales sean correctas.",
		forgotPassword: "¿Olvidaste tu contraseña?",
		login: "Iniciar sesión",
		passwordPlaceholder: "Contraseña",
		success: "¡Has iniciado sesión!",
		termsAndConditions: "Acepto los <0>Términos y Condiciones</0>"
	},
	navigationBar: {
		taskCompleted: "Todas las tareas completadas <0>🚀</0>"
	},
	noteModal: {
		newNote: "Nueva nota",
		placeholder: "Comienza a escribir tu nueva nota...",
		save: "Guardar",
		titlePlaceholder: "Nueva nota: "
	},
	salesforcePages: {
		accountField: {
			syncAlsoAccount: "Sincronizar también la cuenta",
			syncAccountAndContacts: "Sincronizar la cuenta y los contactos relacionados también",
			title: "Cuenta: <strong>{{accountName}}</strong>",
			titleAssigned: "Esta cuenta no se puede sincronizar porque está asignada a {{salesforceOwnerName}} y no está asignada a un usuario de Bloobirds",
			titleDiffAssigned: "Esta cuenta está asignada a otro usuario",
			untitledCompany: "Empresa sin título"
		},
		captureSalesforceForm: {
			account: "Cuenta",
			assignedTo: "Asignado a",
			assignedToGroup: "<strong>está asignado a un grupo de usuarios</strong>, considera asignarlo a un usuario para crearlo en Bloobirds.",
			empty: "Vacío",
			mapMoreFields: "Asigna más campos en Bloobirds",
			missingInfo: "¿Falta alguna información para la sincronización?",
			nextStep: "Siguiente paso sugerido",
			notMapped: "no está asignado a un usuario de Bloobirds. ",
			recordNotSynced: " 👉 Este registro no se puede sincronizar porque ",
			reviewMapped: "Revisa los usuarios asignados aquí.",
			saveAccountIn: "Guardar cuenta en",
			saveContactIn: "Guardar contacto en",
			saveLeadIn: "Guardar lead en",
			saveLeadToCompanyIn: "Guardar lead en la empresa en",
			saveOpportunityIn: "Guardar oportunidad en",
			toast: "Hubo un error al crear tu {{object}}",
			tooltipNotMapped: "El Propietario de {{sobjectType}} no está asignado a un usuario de Bloobirds",
			tooltipOwner: "{{sobjectType}} es propiedad de otro usuario.",
			untitledAccount: "Cuenta sin título",
			untitledCompany: "Empresa sin título",
			untitledLead: "Lead sin título"
		},
		companyField: {
			createNewCompany: "Crear nueva empresa '{{companyName}}'",
			description: {
				createCompany: "Crear empresa '{{companyName}}'",
				foundCompanies_one: "{{count}} posible coincidencia",
				foundCompanies_other: "{{count}} posibles coincidencias",
				matchingCompany: "Empresa coincidente '{{companyName}}'",
				noMatches: "No se encontró ninguna empresa coincidente"
			},
			notFound: "Resultados no encontrados",
			searchPlaceholder: "Buscar empresas",
			searchResults: "Resultados de búsqueda",
			tooltip: "Los leads se guardarán y asignarán a empresas si se encuentra una coincidencia con el nombre de la empresa en Bloobirds. Si no se encuentra el nombre de la empresa, el lead se guardará sin una empresa."
		},
		navigateMessageSalesforce: {
			extraInfo: "Solo podemos capturar la información de leads cuando estás viendo su perfil.",
			tryNavigating: "👉 Intenta navegar a un lead, cuenta u oportunidad."
		},
		relatedSalesforceUserPage: {
			SFDCUserPlaceholder: "Usuario de Salesforce",
			clickHere: "haciendo clic aquí",
			"continue": "Continuar",
			linkExplanation: "Al vincular tu usuario, podrás aprovechar al máximo el potencial de Bloobirds. ¿No encuentras tu nombre de usuario? ",
			linkSalesforce: " Vincula tu usuario de Salesforce para empezar 🚀",
			loginToSF: "Iniciar sesión en Salesforce",
			notAbleToSignIn: "Si no puedes iniciar sesión o no tienes suficientes permisos, elige manualmente tu usuario ",
			refreshHere: "Actualiza aquí",
			toast: {
				error: "Hubo un problema al actualizar tu usuario. ¡Por favor, inténtalo de nuevo!",
				success: "Usuario actualizado exitosamente"
			},
			welcome: "¡Bienvenido, {{name}}!"
		}
	}
};
var generalSearchBar = {
	all: "Todo",
	bannerSubtitle: "La <strong>barra de búsqueda general</strong> es una herramienta que te permitirá buscar diferentes objetos en toda la base de datos al mismo tiempo. Para obtener más información sobre cómo se muestran los resultados de la búsqueda, consulta el artículo en nuestra Base de Conocimiento.",
	bannerTitle: "Busca a otro nivel",
	checkBox: "No volver a mostrar",
	firstTimeSearch: {
		header: "Busca lo que necesitas",
		subtitle1: "Una búsqueda normal mostrará resultados que contienen los términos buscados",
		subtitle2: "Utiliza filtros para centrarte en un tipo de resultado",
		title1: "Busca lo que necesitas",
		title2: "Filtra para obtener más resultados"
	},
	firstTimeSearchCompressed: {
		header: "Busca lo que necesitas",
		subtitle1: "Usar comillas en una búsqueda mostrará resultados exactos",
		subtitle2: "Utiliza filtros para centrarte en un tipo de resultado",
		title1: "Tan preciso como desees",
		title2: "Filtra para obtener más resultados"
	},
	learnMore: "Saber más",
	noRecentActivity: "Sin actividad reciente",
	noResults: {
		results: "resultados",
		subtitle: "Parece que no hay resultados para los criterios especificados",
		title: "No se encontraron {{bobjectType}}"
	},
	openSearchBar: "Abrir la barra de búsqueda con",
	preview: "Vista previa",
	showMore: "Mostrar más",
	statistics: {
		attempts: "Intentos",
		lastAttempt: "Último intento",
		lastTouch: "Último contacto",
		touches: "Contactos"
	}
};
var helperKeys = {
	goals: {
		addFirstBuyerPersona: "Agregar tu primera Persona Compradora (ICP)",
		addYourFirstCadenceStep: "Agregar tu primer paso de cadencia",
		callAndReportResult: "Realizar tu primera llamada",
		checkYourBuyerPersonas: "Verificar tus Personas Compradoras",
		checkYourTargetMarkets: "Verificar tus Mercados Objetivo",
		chooseDialer: "Configurar tu marcador",
		connectCrmTour: "Conectar tu CRM",
		connectEmailAccount: "Conectar tu cuenta de correo electrónico",
		createFirstCompany: "Agregar tu primera Empresa",
		createFirstEmailTemplate: "Crear tus plantillas de correo",
		createFirstLead: "Agregar tu primer Lead",
		createFirstList: "Crear tu primera lista personalizada",
		createFirstTargetMarket: "Agregar tu primer Mercado Objetivo",
		createLeadFromLinkedIn: "Crear tu primer lead desde LinkedIn",
		createYourFirstCadence: "Crear tu primera cadencia",
		createYourFirstPitch: "Crear tu primer discurso de venta",
		customizeCompanyFields: "Personalizar tus campos de empresa",
		customizeLeadFields: "Personalizar tus campos de lead",
		defineFirstScenario: "Definir tu Escenario",
		defineQualifyingQuestions: "Definir tus Preguntas de Cualificación",
		downloadChromeExtension: "Descargar extensión para Chrome",
		enableKpiMetrics: "Habilitar tus métricas KPI y actividad",
		inviteTeam: "Iniciar con la primera invitación",
		launchYourFirstCadence: "Lanzar tu primera cadencia",
		linkFirstMessageLinkedIn: "Vincular tu primer mensaje desde LinkedIn",
		markAsDoneAttempt: "Marcar como completado tu primer intento",
		message: "Objetivo completado: ",
		saveNumberSettings: "Guardar tu configuración de número de teléfono",
		sendFirstAutoEmail: "Crear una cadencia automática",
		sendYourFirstEmail: "Enviar tu primer correo electrónico",
		setUpDashboardsTour: "Configurar tu vista de tableros",
		setUpReminders: "Configurar tus recordatorios",
		setYourEmailSignature: "Configurar tu firma de correo electrónico",
		startTasksFromCadence: "Iniciar tareas desde tu página 'En Cadencia'",
		takeTourOnGeneralSettings: "Realizar el Tour de Configuración General",
		takeTourOnInbox: "Realizar el tour de la Bandeja de entrada de Bloobirds",
		takeTourOnOutbox: "Realizar el tour de la Bandeja de salida de Bloobirds",
		takeTourProspectTab: "Realizar un tour por tu pestaña de prospectos"
	}
};
var home = {
	centerContent: {
		blocks: {
			quickStartGuide: {
				title: "Tu guía de inicio rápido 🚀"
			}
		},
		homeFiltersTooltip: {
			discovery: "Habilita los KPI que más necesitas en cualquier momento.",
			footer: "Con este filtro, puedes elegir ocultar y mostrar los KPI que más te gustan. Recuerda que también puedes ordenar estas secciones arrastrándolas y soltándolas en sus nuevas posiciones."
		},
		quickStartGuideHidden: "La guía de inicio rápido no se puede ocultar hasta que se complete.",
		resetHelpersButton: "Restablecer Ayudas"
	},
	leftContent: {
		taskList: {
			allClear: "Todo claro ✨",
			everythingDone: "Parece que todo está hecho",
			loadMore: "Cargar más",
			noTypeSelected: "Debe seleccionar un tipo de tarea para ver las tareas.",
			taskHomeCard: {
				rescheduleTask: "Reprogramar la tarea",
				scheduledAt: "Programado a:"
			},
			tasksForToday: "Tareas para hoy"
		},
		todayTasks: "Tareas de hoy"
	},
	title: "¡Hola, {{userName}}!"
};
var languages = {
	en: "Inglés 🇬🇧",
	es: "Español 🇪🇸",
	it: "Italiano 🇮🇹",
	pickALanguage: "Selecciona un idioma para trabajar",
	selectALanguage: "Selecciona un idioma"
};
var leftBar = {
	actions: {
		markAllReported: "Reportar todo",
		readAll: "Marcar todo como leído"
	},
	bulk: {
		actionDisabled: "Para realizar {{action}} en masa, las tareas seleccionadas deben pertenecer al mismo tipo de objeto",
		continueWithMaximum: "Continuar con un máximo de 1000",
		reschedule: "Reprogramar",
		results_one: "{{count}} resultado",
		results_other: "{{count}} resultados",
		selectAll: {
			companies: "Seleccionar todas las {{count}} empresas",
			general: "Seleccionar todo",
			leads: "Seleccionar todos los {{count}} prospectos",
			opportunities: "Seleccionar todas las {{count}} oportunidades"
		},
		selectedAllText: {
			companies: "Todas las <strong>{{selected}}</strong> empresas seleccionadas de un total de <strong>{{totalMatching}}</strong>.",
			leads: "Todos los <strong>{{selected}}</strong> prospectos seleccionados de un total de <strong>{{totalMatching}}</strong>.",
			opportunities: "Todas las <strong>{{selected}}</strong> oportunidades seleccionadas de un total de <strong>{{totalMatching}}</strong>."
		},
		setCadence: "Establecer cadencia",
		stopCadence: "Detener cadencia"
	},
	card: {
		call: {
			IncomingCall: "Llamada entrante",
			MissedCall: "Llamada perdida",
			OutgoingCall: "Llamada saliente",
			from: "de ",
			note: "Nota",
			"with": "con "
		},
		whatsapp: {
			assignMessage: "Asignar o crear un nuevo contacto",
			createContact: "Asignar",
			discardMessage: "Descartar este mensaje",
			lastMessage: "Último mensaje",
			markAsRead: "Leído",
			message: "Mensaje",
			reassignMessage: "Reasignar la conversación a otro miembro del equipo",
			replyButton: "Responder",
			title: "WhatsApp conversation"
		}
	},
	userTeamsFilter: {
		teamsSelected_one: "Un usuario seleccionado",
		teamsSelected_other: "{{count}} usuarios seleccionados",
		userTeamsFilterPlaceholder: "Equipos",
		allTeams: "Todos los equipos",
		me: "Yo"
	},
	dateFilter: {
		allTime: "Todo el tiempo",
		allTimeUntilToday: "Todo el tiempo (hasta hoy)",
		lastMonth: "Mes pasado",
		lastQuarter: "Último trimestre",
		lastWeek: "Semana pasada",
		lastYear: "Último año",
		next30days: "Próximos 30 días",
		next7days: "Próximos 7 días",
		sinceToday: "Desde hoy",
		thisMonth: "Este mes",
		thisMonthUntilToday: "Este mes (hasta hoy)",
		thisQuarter: "Este trimestre",
		thisQuarterUntilToday: "Este trimestre (hasta hoy)",
		thisWeek: "Esta semana",
		thisWeekUntilToday: "Esta semana (hasta hoy)",
		thisYear: "Este año",
		thisYearUntilToday: "Este año (hasta hoy)",
		today: "Hoy",
		yesterday: "Ayer"
	},
	errorChangeLng: "Se ha producido un error al cambiar el idioma a {{language}}",
	filters: {
		all: "Todos",
		assignedTo: "Asignado a",
		date: "Fecha",
		failed: "Fallido",
		lastAssigned: "Fecha de asignación más antigua",
		lastUpdateOldest: "Última actualización más antigua",
		lastUpdateRecent: "Última actualización más reciente",
		me: "Yo",
		no: "No",
		orderBy: "Ordenar por",
		paused: "Pausado",
		priority: "Prioridad",
		quickFilters: "Filtros rápidos",
		recentAssigned: "Fecha de asignación más reciente",
		reported: "Reportado",
		copilotAnalysis: "Análisis de IA",
		rescheduled: "Reprogramado",
		reset: "Limpiar",
		saveQuickFiltersQuestion: "¿Quieres guardar esta búsqueda?",
		saveQuickFiltersText: "Crea tu primer filtro rápido",
		scheduled: "Programado",
		stages: "Etapas",
		status: "Estado",
		taskType: "Tipo",
		succesfullySent: "Enviado con éxito",
		yes: "Sí",
		timezoneRange: {
			placeholder: "Tareas en todos los horarios de los contactos",
			title: "Filtrar tareas según el <strong>horario local</strong> de los contactos:",
			quickFilters: {
				allDay: "Todo el día",
				labourHours: "Horairo laboral",
				mornings: "Solo mañanas",
				afternoons: "Solo tardes"
			},
			from: "desde las {{hour}}",
			to: "hasta las {{hour}}",
			clear: "Limpiar",
			displayValue: "Desde las {{start}} hasta las {{end}}"
		}
	},
	footer: {
		accountSettings: "Configuración de cuenta",
		cadence: "Cadencias",
		chromeExtension: "Extensión de Chrome",
		dashboard: "Tableros",
		dialers: "Teléfono",
		help: "Ayuda",
		meetingLinks: "Enlaces de reunión",
		notifications: "Notificaciones",
		report: "Listas",
		salesTeam: "Equipo de ventas",
		"task&Reminders": "Tareas y recordatorios",
		userSettings: "Configuración de usuario"
	},
	inactive: "Inactivo",
	inbox: "Bandeja de entrada",
	leftBarHints: "Indicaciones de la barra lateral",
	meetings: "Reuniones",
	noResultsPage: {
		createNewTask: "Crear nueva tarea",
		emptyTaskList: {
			description: "¡Parece que todo está hecho!",
			title: "Todo en orden ✨"
		},
		noFilterResults: {
			description: "Intenta modificar los criterios de tu filtro",
			title: "Sin resultados 🔍"
		},
		noFilterSelected: {
			description: "Selecciona un filtro para mostrar resultados",
			title: "Ningún filtro seleccionado 👆"
		}
	},
	nurturing: "Nurturing",
	outbox: "Bandeja de salida",
	overdueTasks: "Tareas vencidas",
	pipeline: "Mis objetos",
	quickFilters: {
		activePipeline: "Pipeline activo",
		automatedEmails: "Correos automáticos",
		calls: "Llamadas",
		delivered: "Entregados",
		emails: "Correos electrónicos",
		firstMeeting: "Primera reunión",
		followUp: "Seguimiento",
		linkedin: "LinkedIn",
		manualTasks: "Tareas manuales",
		meetingReminders: "Recordatorios de reuniones",
		onCadence: "En cadencia",
		scheduledEmails: "Correos programados",
		tasks: "Tareas",
		whatsapp: "WhatsApp"
	},
	successChangeLng: "Has cambiado correctamente el idioma a {{language}}",
	tasks: "Tareas",
	todayTasks: {
		description: "Todas tus tareas para hoy se encuentran aquí. ¡Vamos a completarlas! ✨",
		title: "Tareas de hoy"
	},
	tour: {
		activities: {
			content: "Revise cada interacción pasada en esta sección, incluyendo llamadas, correos electrónicos, reuniones y actualizaciones, con una vista detallada.",
			title: "Actividades"
		},
		contactabilityTools: {
			content: "Desde llamadas y correos hasta notas y tareas, todo lo que necesita para mantenerse en contacto están a solo un clic de distancia. ¡Comencemos a prospectar! ✈️",
			title: "Herramientas"
		},
		overview: {
			content: "Consulta la información principal de una empresa, prospecto u oportunidad. También puedes ver la actividad pasada y mostrar datos clave.",
			title: "Resumen"
		},
		playbook: {
			content: "Nuestro playbook ayuda a los vendedores a seguir la estrategia de ventas sin darse cuenta. ✨ (PSST, esto funciona especialmente bien en nuestro editor de correos! ✉️)",
			title: "Playbook"
		},
		tasks: {
			content: "¡No olvides lo que debes hacer! Las tareas vencidas, de hoy y futuras están agrupadas aquí. ¡Vamos a hacerlas! ✨",
			title: "Tareas"
		}
	},
	undoToast: {
		title_one: "{{count}} tarea completada",
		title_other: "{{count}} tareas completadas"
	}
};
var linkedInDetail = {
	messageNotAvailable: "El mensaje no se pudo analizar en Bloobirds"
};
var meetingModal = {
	accountExecutive: "Ejecutivo de cuentas",
	activityDetailForm: {
		requiredMessage: "Información requerida para cerrar la reunión"
	},
	bloobirdsCalendarSelector: {
		accountExecutives: "Ejecutivos de cuenta",
		calendar: "Calendario",
		selected: "Seleccionado",
		users: "Usuarios",
		you: "Tú"
	},
	calendar: {
		calendarNotConnected: {
			clickAndRefresh: "Ya has iniciado sesión. Haz clic para actualizar",
			connectGoogle: "Conectar el calendario de Google",
			connectOutlook: "Conectar el calendario de Outlook",
			syncBloobirds: "Sincroniza tu calendario con Bloobirds"
		},
		yourTimezone: "Tu hora en la zona horaria"
	},
	calendarName: "Calendario",
	calendarSelector: {
		calendarAccount: "Cuenta de calendario",
		calendarsSelected: "Calendarios seleccionados",
		infoText: {
			howToAsk: "cómo solicitar la suscripción a los calendarios de tus colegas",
			learnHere: "Aprende aquí",
			missingCalendar: "¿Te falta algún calendario?",
			toSeeIt: "para verlo en Bloobirds"
		},
		myCalendars: "Mis calendarios",
		noCalendarsSelected: "0 calendarios seleccionados",
		otherCalendars: "Otros calendarios"
	},
	cancel: "Cancelar",
	change: "Cambiar",
	create: "Crear",
	createEventInCalendar: "Crear evento en el calendario",
	"delete": "Eliminar",
	guests: "Invitados",
	inviteeCard: {
		ae: "AE",
		company: "Empresa",
		coworker: "Compañero de trabajo",
		lead: "Prospecto",
		leadNoEmail: "El lead no tiene correo, no se le enviará una invitación",
		organizer: "Organizador",
		user: "Usuario"
	},
	inviteesNotSynced: "Los invitados no se sincronizarán con tu calendario",
	mainForm: {
		conferencingForm: {
			addGoogle: "Agregar conferencia de video de Google Meet",
			linkByGoogle: "Enlace de conferencia por Google Meet",
			addTeams: "Agregar conferencia de video de Microsoft Teams",
			linkByTeams: "Enlace de conferencia por Microsoft Teams"
		},
		date: "Fecha",
		durationMin: "Duración (min)",
		meetingDetails: "Detalles de la reunión",
		meetingResult: "Resultado de la reunión",
		reminderForm: {
			addNotificationEmail: "Agregar un correo de notificación",
			days: "Días",
			emailTemplate: "Plantilla de correo",
			hours: "Horas",
			minutes: "Minutos",
			myTemplates: "Mis plantillas",
			teamTemplates: "Plantillas del equipo",
			thisFieldIsRequired: "Este campo es obligatorio",
			tooltipMessage: "La notificación por correo se enviará desde tu correo electrónico al lead asignado a la reunión"
		},
		thisFieldIsRequired: "Este campo es obligatorio",
		title: "Título",
		tooltipMessage: "Este es el Tipo de Reunión, usa solo Primera Reunión en caso de que esta reunión entregue el lead o la empresa al Ejecutivo de Cuentas"
	},
	meetingAssignedTo: "Reunión asignada a",
	meetingDetails: "Detalles de la reunión",
	notAllowedTitle: "No tienes permiso para cambiar esta configuración, consulta a tu administrador para obtener más información",
	noteInternal: {
		placeholder: "Agrega tus notas internas aquí...",
		title: "Nota (Interna)"
	},
	noteCalendar: {
		placeholder: "Agrega tus notas aquí...",
		title: "Notas para el calendario"
	},
	save: "Guardar",
	searchLeadsGuests: {
		addAnother: "Agregar otro correo o buscar un lead",
		dropdownHeader: {
			coworkersEmails: "Correos de tus compañeros de trabajo",
			everywhere: "en todas partes",
			inCompany: "en la empresa",
			search: "Buscar"
		},
		invalidEmail: "Correo inválido"
	},
	thisFieldIsRequired: "Este campo es obligatorio",
	timezone: "Zona horaria",
	toasts: {
		deleteSuccess: "Reunión eliminada con éxito",
		somethingHappenedWhileCreating: "Ocurrió algo mientras se creaba el evento, por favor verifica las conexiones",
		somethingHappenedWhileUpdating: "Ocurrió algo mientras se actualizaba el evento, por favor verifica las conexiones",
		success: "Evento creado con éxito",
		updateSuccess: "Evento actualizado con éxito"
	},
	today: "Hoy",
	untitledEvent: "Evento sin título"
};
var minimizableModals = {
	calendarMeeting: "reunión de calendario",
	email: "correo electrónico",
	handleTemplate: "manejar plantilla",
	meeting: "reunión",
	note: "nota",
	task: "tarea"
};
var misc = {
	activityNotFoundInBloobirds: "Actividad no encontrada en Bloobirds",
	notifications: {
		loadMore: "Cargar más",
		markAllAsRead: "Marcar todo como leído",
		noUpdates: "No hay actualizaciones para mostrar",
		notifications: "Notificaciones",
		poweredByBloobirds: "Desarrollado por <strong>Bloobirds</strong>",
		tabs: {
			calls: "Llamadas",
			emailTracking: "Mail",
			inbound: "Entrantes",
			updates: "Actualizaciones"
		}
	}
};
var notes = {
	bobjectNote: "Notas de {{bobjectName}}",
	incomingCall: "Llamada entrante",
	newNote: "Nueva nota",
	outgoingCall: "Llamada saliente",
	placeholder: "Comienza a escribir tu nueva nota...",
	save: "Guardar",
	saving: "Guardando",
	titlePlaceholder: "Nueva nota: ",
	toasts: {
		errorCreating: "Error al crear la nota",
		errorUpdating: "Error al actualizar la nota",
		successCreating: "Nota creada con éxito!",
		successUpdating: "Nota guardada con éxito!"
	},
	untitledCompany: "Empresa sin título",
	untitledLead: "Lead sin título",
	untitledOpportunity: "Oportunidad sin título"
};
var playbook = {
	addLeadToActivityModal: {
		callout: "Registre este número si desea que las llamadas futuras se asocien con este lead.",
		title: "Asignar llamada a un prospecto",
		toast: {
			error: "Hubo un problema al asignar el prospecto.",
			success: "¡Prospecto asignado con éxito!"
		}
	},
	addNew: "Agregar nuevo",
	addNewQQ: "Add PQ",
	addNewTemplate: "Agregar nueva plantilla",
	addToCalendarModal: {
		addToCalendar: "Agregar al calendario",
		header: "Agende una reunión de 30 minutos en su calendario",
		untitled: "Evento sin título"
	},
	allAssets: "Todos los {{segmentationName}}s",
	andThisIsHowWeTranslateIt: "...y así es como lo traducimos a {{type}}",
	areYouSure: "¿Está seguro de que desea continuar?",
	buyerPersonaDefinition: "Una persona compradora es una representación ficticia de su cliente ideal o audiencia objetivo. Hay múltiples personas compradoras dentro de una empresa objetivo. Por ejemplo, nuestro cliente de software de inteligencia de ubicación ha identificado a los directores de ventas, los directores de marketing comercial y los directores de marca como los compradores ideales dentro de las empresas objetivo de productos de consumo masivo.",
	buyerPersonaExample: "Ejemplo de persona compradora",
	card: {
		battlecard: "Battlecard",
		edit: "Editar",
		insert: "Insertar",
		officialTemplate: "Plantilla oficial",
		send: "Enviar",
		shortcut: "Atajo",
		use: "Usar",
		view: "Ver",
		html: "Plantilla HTML"
	},
	customTasks: {
		addCustom: "Agregar tarea personalizada",
		addFields: "Agregar campos a la tarea personalizada",
		cannotChangeIcon: "No se puede cambiar el icono de una Tarea Personalizada del Sistema",
		cannotChangeTitle: "No se puede cambiar el título de una Tarea Personalizada del Sistema",
		clickOnSearchBar: "Haga clic en la barra de búsqueda de arriba para comenzar a buscar.",
		fieldsRearrangementExplanation: "Una vez seleccionados, puede arrastrar, reorganizar y eliminar cualquier campo como desee.",
		fieldsToDisplay: "Campos disponibles para mostrar",
		fieldsToDisplayExplanation: "Busque, encuentre y elimine cualquier campo para sus tareas personalizadas",
		fieldsToDisplayRequired: "También puede marcar cada campo como obligatorio",
		markRequired: "Marcar como obligatorio",
		mustHaveDescription: "La tarea debe tener una descripción",
		mustHaveName: "La tarea debe tener un nombre.",
		noFieldsSelected: "🔍 No se han seleccionado campos",
		placeholderDescription: "Descripción breve de en qué consiste la tarea",
		placeholderTitle: "Establece el nombre del tipo de tarea",
		selectFieldsHere: "Seleccione aquí los campos para mostrar los datos de ellos",
		showDisabled: "Mostrar tipos de tarea desactivados",
		stillNoCustom: "Todavía no se han creado tareas personalizadas",
		taskDescriptionHeader: "Descripción de la tarea",
		taskExtraFieldsHeader: "Campos adicionales",
		taskReminder: "¿Es una tarea de recordatorio?",
		taskShouldCreateActivity: "¿Crea una actividad?",
		taskIconAndNameHeader: "Ícono y nombre de la tarea",
		taskStatusHeader: "Estado",
		taskTypes: "Tipos de tarea",
		taskTypesSubtitle: "Cree tareas personalizadas para registrar acciones personalizadas en Bloobirds",
		unmarkRequired: "Desmarcar como obligatorio"
	},
	deleteTargetMarketWarning: "Está a punto de eliminar permanentemente el mercado objetivo &quot;{{name}}&quot;",
	emailTemplate: "Plantilla de correo electrónico",
	emails: "Correos",
	guideTitle: "Guía para entender los recursos empresariales",
	handleTemplate: {
		accept: "Aceptar",
		cancel: "Cancelar",
		confirmation: {
			saveExisting: "Guardar plantilla de correo electrónico existente"
		},
		"delete": {
			text_one: "Esta plantilla se está utilizando en {{count}} cadencia, si desea eliminarla, desvincule la plantilla de estas cadencias.",
			text_other: "Esta plantilla se está utilizando en {{count}} cadencias, si desea eliminarla, desvincule la plantilla de estas cadencias.",
			title: "Eliminar",
			titleWithValue: "Eliminar {{value}}"
		},
		deleteTemplate: "Eliminar plantilla",
		discard: {
			aboutToDelete: "Está a punto de eliminar una plantilla.",
			changesNotSaved: "Los cambios no se guardarán.",
			noUndone: "Esta acción no se puede deshacer.",
			sure: "¿Está seguro de que desea hacer esto?",
			title: "Descartar",
			titleWithValue: "Descartar {{value}}"
		},
		discardChanges: "Descartar cambios",
		discardTemplate: "Descartar plantilla",
		edit: {
			text_one: "Esta plantilla se está utilizando en {{count}} cadencia, estos cambios se aplicarán a todas las tareas de correo electrónico automático que están utilizando esta plantilla y ya están programadas.",
			text_other: "Esta plantilla se está utilizando en {{count}} cadencias, estos cambios se aplicarán a todas las tareas de correo electrónico automático que están utilizando esta plantilla y ya están programadas."
		},
		save: "Guardar",
		saveTemplate: "Guardar plantilla",
		toasts: {
			deleteSuccess: "¡Plantilla eliminada con éxito!",
			nameAlreadyExists: "Ya existe una plantilla con el mismo nombre, por favor intente con uno nuevo",
			nameRequired: "Se requiere un nombre para la plantilla",
			success: "¡Plantilla guardada con éxito!"
		}
	},
	linkedin: "LinkedIn",
	linkedinTemplate: "Plantilla de LinkedIn",
	nameFormEditor: {
		placeholder: "Nombre de la plantilla...",
		requiredText: "Se requiere un nombre para la plantilla",
		title: "Título"
	},
	newBuyerPersona: "Nueva persona compradora",
	newScenario: "Nuevo escenario",
	newTargetMarket: "Nuevo mercado objetivo",
	noBuyerPersonas: "No hay personas compradoras para la búsqueda siguiente",
	noPhoneNumber: "Añadir un nº de teléfono para usar las plantillas",
	noTargetMarkets: "No hay mercados objetivos para la búsqueda siguiente",
	onlyOwner: "Solo el Propietario o un Administrador puede editar esta plantilla",
	permissions: "No tiene los permisos necesarios para realizar esta acción",
	pitchTemplate: "Plantilla de discurso",
	pitches: "Discursos",
	pitchesAndSnippets: "Discursos y Fragmentos",
	playbook: "Playbook",
	playbookTemplates: "Plantillas de playbook",
	qqs: "PPQ",
	qualifyingQuestions: {
		nonePlaceholder: "Ninguno",
		picklistSelect: "Seleccionar..."
	},
	scenarioDefinition: "Los escenarios son diferentes casos de uso para su solución dependiendo del problema actual que enfrenta diariamente su cliente. Específicamente, es su punto de dolor y su objetivo es hacer que sean conscientes tanto del dolor como de la solución. Los puntos de dolor dependen de la madurez de la empresa cliente.",
	searchTemplates: "Buscar plantillas",
	seeHowPersonasHelper: "¡Vea cómo configurar correctamente su playbook puede ayudarlo en su proceso de ventas! Vea algunos ejemplos para inspirarse y luego haga clic en el botón Crear persona compradora para comenzar.",
	seeHowTargetsHelper: "¡Vea cómo configurar correctamente su playbook puede ayudarlo en su proceso de ventas! Vea algunos ejemplos para inspirarse y luego haga clic en el botón Crear mercado objetivo para comenzar.",
	seeSomeExamples: "Ver algunos ejemplos",
	segmentationFilter: {
		all: "Todas",
		canChooseMoreThanOne: "Puede elegir más de uno",
		categorization: "Categorización",
		categorizationText: "La categorización le permite filtrar fácilmente sus plantillas",
		officialPlaybook: "Plantilla oficial de playbook",
		onlyBattlecards: "Solo battlecards",
		onlyMine: "Solo el mío",
		onlyOfficial: "Solo oficial",
		onlyPrivate: "Solo privado",
		options: "Opciones",
		playbookBattlecard: "Battlecard de playbook",
		prospect: "Prospecto",
		prospectAndSalesStages: "Prospecto y etapa de ventas",
		prospectStage: "Etapa de prospecto",
		sales: "Ventas",
		salesStage: "Etapa de ventas",
		segmentation: "Segmentación",
		segmentationAndFilters: "Segmentación y filtros",
		stage: "Etapa",
		visibleToAllMembers: "Visible para todos los miembros del equipo",
		clearButton: "limpiar",
		selectedValue: "Select {{sectionName}}",
		multipleSelectedValues: "{{count}} values selected"
	},
	selectSegmentationCriteria: "Seleccionar criterios de segmentación",
	selectedFilters: "{{count}} filtro seleccionado:",
	selectedFilters_other: "{{count}} filtros seleccionados:",
	snippetTemplate: "Plantilla de fragmento",
	snippets: "Fragmentos",
	stillNoBuyerPersonas: "Todavía no se han creado personas compradoras",
	stillNoTargets: "Todavía no se han creado mercados objetivos",
	subtitle: "Configure su estrategia de playbook creando sus recursos empresariales: mercados objetivos, personas compradoras, escenarios y cadencias",
	tabContent: {
		mySnippets: "Mis fragmentos",
		myTemplates: "Mis plantillas",
		noQQs: "No se han creado QQs 💬",
		noQQsMessage: "Los QQ configurados aparecerán aquí",
		noResults: "No encontramos ninguna coincidencia para su búsqueda 🔍",
		noResultsHint: "Modifique su búsqueda y vuelva a intentarlo",
		noTemplates: "No hay plantillas de {{type}} {{icon}}",
		noTemplatesMessage: "Las {{type}} recién creadas aparecerán aquí",
		suggestedTemplates: "Plantillas sugeridas",
		teamTemplates: "Plantillas del equipo",
		search: "Buscar..."
	},
	targetMarketDefinition: "Un mercado objetivo es un grupo de individuos que comparten necesidades o características similares a las que su solución puede agregar valor. ¡Identificar un mercado objetivo ayuda a su empresa a desarrollar estrategias de ventas y marketing efectivas!",
	targetMarketsExample: "Ejemplo de mercados objetivos",
	templateForm: {
		bodyPlaceholder: "Cuerpo",
		create: "Crear",
		edit: "Editar",
		enterBodyPlaceholder: "Ingrese el cuerpo del correo electrónico...",
		shortcutNamePlaceholder: "Nombre del atajo...",
		shortcutPlaceholder: "Atajo...",
		shortcutTooltip: "Para usar un fragmento, escriba '/' seguido del nombre del fragmento en el editor de texto, sin espacios",
		subjectPlaceholder: "Asunto",
		templateInformation: "Información de la plantilla"
	},
	templateFormHeader: {
		author: "Autor",
		battlecard: "Battlecard de playbook",
		changeSegmentation: "Cambiar segmentación",
		createdBy: "Creado por",
		discardChanges: "Descartar cambios",
		discardTemplate: "Descartar plantilla",
		editTitle: "Editar {{type}}",
		goBack: "Volver",
		lastUpdatedBy: "Última actualización por",
		metrics: {
			clickRate: "Tasa de clics",
			openRate: "Tasa de apertura",
			replyRate: "Tasa de respuesta",
			timesDelivered: "Veces entregado"
		},
		noStage: "⚠️ Sin etapa",
		official: "Plantilla oficial de playbook",
		"private": "Privado",
		prospecting: "Prospección",
		prospectingAndSales: "Prospección y ventas",
		"public": "Público",
		sales: "Ventas",
		save: "Guardar",
		saveNewTitle: "Guardar nuevo {{type}}",
		userOnDate: "{{user}} el {{date}}"
	},
	templatesAndSnippets: "Plantillas y Fragmentos",
	thisIsABusinessModelExample: "Este es un ejemplo de modelo de negocio",
	title: "Recursos empresariales",
	untitledTemplate: "Plantilla sin título",
	whatsapp: "WhatsApp",
	whatsappTemplate: "Plantilla de WhatsApp"
};
var quickLogModal = {
	cancel: "Cancelar",
	create: "Crear",
	"delete": "Eliminar",
	editTitle: "Editar registro {{customTask}}",
	leadSelector: {
		none: "Ninguno",
		placeholder: "Lead asociado {{required}}",
		required: "Este campo es obligatorio"
	},
	logTitle: "Registro {{customTask}}",
	save: "Guardar",
	toasts: {
		successLog: "Has registrado con éxito la actividad {{name}}",
		successUpdate: "Has actualizado con éxito la actividad {{name}}"
	}
};
var quickStartGuide = {
	oto: {
		blocks: {
			language: {
				title: "Elija su idioma",
				subtitle: "Puede cambiar su idioma en la configuración de usuario en cualquier momento.",
				skipButtonText: "Continua con el idioma por defecto"
			},
			email: {
				title: "Conecta tu correo electrónico",
				titleSignature: "Configura tu correo electrónico",
				skipButtonText: "Continua sin correo",
				skipButtonTextSignature: "Continua sin firma",
				content: {
					addCheck: "Add my signature at the bottom when I compose emails",
					changeCheck: "Enable change signature when I compose emails",
					tracking: {
						title: "Notificaciones de seguimiento de correo electrónico",
						notifyCheck: "Notificarme cuando un cliente potencial abre, hace clic o responde a mis correos electrónicos"
					}
				}
			},
			sfdc: {
				addedTime: "Añadido {{dateDistance}}",
				connectToSfdc: "Conectar a SFDC",
				subtitle: "<0>¿Estás probando?</0> <1>Conecta una cuenta de sandbox en su lugar</1>",
				title: "Conecta tu cuenta de Salesforce",
				skipButtonText: "Continua sin Salesforce"
			},
			start: {
				completeSteps: "Completa todos los pasos para instalar la aplicación",
				installBloobirds: "Instalar Bloobirds",
				title: "Comienza a usar Bloobirds",
				tooltip: "Debes completar todos los pasos antes de empezar"
			},
			timezone: {
				accept: "Aceptar",
				myTimezone: "Mi zona horaria",
				title: "Configura tu zona horaria",
				skipButtonText: "Continua sin zona horaria",
				toasts: {
					error: "Hubo un error al guardar tus ajustes personales.",
					success: "¡Tus ajustes han sido actualizados!"
				}
			},
			dialer: {
				title: "Elige tu marcador",
				skipButtonText: "Continua sin marcador",
				content: {
					disabledTooltip: "Tu usuario no tiene asignado un usuario de {{dialerName}} mapeado, ¡pide a tu administrador que lo asigne!",
					logCallsManually: {
						title: "¿Quieres poder registrar llamadas manualmente desde el marcador?",
						checkbox: "Habilitar vista de registro de llamadas manualmente"
					},
					changePhoneManually: {
						title: "Cambiar automáticamente el teléfono del usuario a uno que coincida con la extensión del teléfono del lead si está disponible",
						checkbox: "Cambiar automáticamente la extensión del teléfono"
					},
					syncContactsAircall: "Sincronizar tus contactos de Bloobirds a Aircall"
				}
			},
			taskAndReminders: {
				title: "Tareas y recordatorios",
				skipButtonText: "Continua sin recordatorios",
				content: {
					enableReminders: "Activar recordatorios de tarea",
					selectorPlaceholder: "Tiempo antes para ser notificado",
					autoComplete: "Autocompletar tus tareas de Cadencia y Programadas al intentar",
					options: {
						"1": "1 minuto",
						"5": "5 minutos",
						"10": "10 minutos",
						"20": "20 minutos",
						"30": "30 minutos",
						"60": "1 hora",
						"120": "2 horas"
					},
					toasts: {
						error: "¡Hubo un error al guardar tus ajustes de recordatorio!"
					}
				}
			}
		},
		subtitle: "¡Comienza a vender en menos de <strong>1 minuto!</strong>",
		title: "Guía de essenciales 🚀",
		progressText: "Todas las tareas completadas"
	}
};
var richTextEditor = {
	meetingLinks: {
		add: "Agregar",
		alertMessage: "Si el remitente no ha definido o elimina un enlace de reunión, el correo electrónico no se enviará.",
		linkTo: "Enlace a",
		meetingLink: "Enlace de reunión",
		myMeetingLinks: "Mis enlaces de reunión",
		noMeetingLinks: "No se han creado enlaces de reunión para este usuario",
		otherMeetingLinks: "Enlaces de reunión de otros usuarios",
		placeholder: "Texto a mostrar *",
		required: "Este campo es obligatorio",
		sendersMeetingLinks: "Enlace de reunión del remitente",
		specificUsersMeetingLinks: "Enlaces de reunión de usuarios específicos",
		title: "Enlace de reunión",
		user: "Usuario",
		you: "Tú"
	},
	missingMeetingLink: "El usuario no tiene un enlace de reunión predeterminado o este enlace ha sido eliminado",
	saveSnippet: "Guardar fragmento",
	sizes: {
		huge: "Enorme",
		large: "Grande",
		medium: "Mediano",
		small: "Pequeño"
	},
	toasts: {
		sizerError: "El archivo excede el tamaño máximo permitido de 15 MB",
		uploadAttachmentError: "Error al cargar el archivo adjunto"
	},
	variableNotFound: "No se pudo encontrar la variable",
	variables: {
		company: "Empresa",
		lead: "Prospecto",
		opportunity: "Oportunidad",
		sdr: "SDR"
	}
};
var scheduler = {
	addGuests: "Añadir invitados",
	allSlotsBooked: "Todos los intervalos han sido reservados para el día",
	chooseDate: "Seleccionar una fecha",
	confirmation: {
		invitationSent: "Se ha enviado una invitación a todas las direcciones de correo",
		subtitle: "Has programado una reunión con",
		title: "Fantástico 🎉"
	},
	"continue": "Continuar",
	email: "Correo",
	error: "Algo salió mal",
	errorPageInfo: "Intenta verificar si el enlace copiado no fue modificado.<br/>Si el problema persiste, consulta directamente con el remitente.",
	errorPageInfoTitle: "No se pueden mostrar los espacios disponibles",
	expired: {
		subtitle: "Por favor, pide a la persona que te envió este enlace que te envíe otro",
		title: "¡El enlace que has seleccionado ha expirado!"
	},
	guests: {
		emailAlreadyAdded: "Este correo ya ha sido añadido",
		fieldRequired: "Este campo es obligatorio",
		invalidEmailError: "Dirección de correo no válida",
		invalidEmailTooltip: "Este correo no es válido",
		invalidEmailsError: "Hay una dirección de correo no válida",
		noEditInfo: "Los invitados no pueden editarse una vez que la reunión está programada",
		numberEmails: "Hasta 10 correos adicionales",
		numberEmailsError: "Solo puedes añadir hasta 10 invitados",
		placeholder: "Escribe un correo y presiona Enter para añadirlo a la lista"
	},
	meetingDetails: "Detalles de la reunión",
	minsMeeting_one: "{{count}} minuto de reunión",
	minsMeeting_other: "{{count}} minutos de reunión",
	mins_one: "{{count}} minuto",
	mins_other: "{{count}} minutos",
	name: "Nombre",
	noAvailableSlot: "Este intervalo ya no está disponible.",
	note: "Nota de la reunión",
	poweredByBloobirds: "Desarrollado por Bloobirds",
	scheduleMeeting: "Programar reunión"
};
var sidePeek = {
	bobjectBriefCard: {
		closes: "Cierra",
		note: "Nota",
		onCadence: "En cadencia",
		untitledCompany: "Empresa sin título"
	},
	captureForm: {
		saveLeadAndCompany: "+ GUARDAR LEAD Y EMPRESA",
		saveLeadToCompany: "+ GUARDAR LEAD EN EMPRESA",
		saveLeadWithoutCompany: "+ GUARDAR LEAD SIN EMPRESA"
	},
	captureLinkFailed: {
		errorDescription: "La URL de LinkedIn de esta página no se pudo copiar. Haz clic en el botón a continuación para intentar nuevamente.",
		retryAutomatically: "Reintentar automáticamente",
		title: "Error al copiar la URL de LinkedIn"
	},
	companyBriefHeader: {
		untitledCompany: "Empresa sin título"
	},
	contactRelatedCompanies: {
		addChildCompanies: "Agregar empresas filiales",
		addChildCompany: "Agregar una empresa filial",
		addParentCompany: "Agregar una empresa matriz",
		addParentOrChildCompany: "Agrega una empresa matriz o filial para hacer un seguimiento de la estructura organizativa de",
		addRelatedCompany: "Agregar una empresa relacionada",
		asParentCompany: "como tu empresa matriz?",
		child: "filial",
		childCompanies: "Empresas filiales",
		childCompany: "Empresa filial",
		company: "empresa",
		confirmSetAndRemoveCompany: "Esto <strong>eliminará</strong> relaciones anteriores con otras empresas",
		confirmSetCompany: "¿Deseas establecer",
		discardChanges: "Descartar cambios",
		editChildCompanies: "Editar empresas filiales",
		editCompanies: "Editar empresas",
		existingRelatedCompany: "Parece que ya tienes una empresa matriz configurada. Si continúas con este proceso, eliminarás esa relación con la empresa.",
		goingToRemove: "Estás a punto de eliminar",
		goingToRemoveConfirm: "como tu empresa matriz. ¿Estás seguro de que deseas hacerlo?",
		parent: "matriz",
		parentCompany: "Empresa matriz",
		remove: "Eliminar",
		removeRelationships: "Eliminar relaciones",
		replace: "Reemplazar",
		replaceRelationships: "Reemplazar empresa",
		saveChanges: "Guardar cambios",
		searchAndSelect: "Buscar y seleccionar una",
		searchByName: "Buscar empresas por nombre.",
		selectTypeCompany: "Selecciona qué tipo de empresa deseas agregar",
		siblingCompanies: "Empresas hermanas"
	},
	contactViewActions: {
		buyerPersona: "Persona compradora",
		contactButtons: {
			goToHubspot: "Ir al registro de Hubspot",
			goToSFDC: "Ir al registro de Salesforce",
			noPermissions: "No tienes los permisos necesarios para realizar esta acción",
			openInBB: "Abrir en Bloobirds",
			openInLinkedIn: "Abrir {{bobjectType}} en LinkedIn",
			openMainNote: "Abrir nota principal",
			searchInLinkedIn: "Buscar {{bobjectType}} en LinkedIn",
			similarWonDeals: "Negocios ganados similares"
		},
		contactDetails: "Datos de contacto",
		logCallManually: "Registrar llamada manualmente",
		openDialer: "Abrir marcador",
		callManually: "Llamada manual",
		mainNote: "Principal",
		"new": "Nuevo",
		newEmail: "Nuevo correo",
		noPermissionsToPerformAction: "No tienes los permisos necesarios para realizar esta acción.",
		noPhoneNumbers: "Sin números de teléfono",
		noteMessage: "¿Deseas abrir la nota principal o crear una nueva?",
		quickLog: "Registro rápido",
		quickLogCustomTask: {
			addNewCustomTasks: "Agregar nuevas tareas personalizadas",
			askYourManager: "Pide a tu supervisor que cree un tipo de tarea personalizada",
			configureCustomTasks: "Configurar tareas personalizadas",
			missingSome: "¿Falta alguna actividad personalizada para registrar?",
			noCustomTasksCreated: "No hay tareas personalizadas creadas o habilitadas. Asegúrate de tener al menos un tipo de tarea personalizada disponible para seleccionar este paso.",
			sectionTitle: "Registrar actividad rápida con un solo clic",
			tooltip: "Registro de actividad rápido"
		},
		targetMarket: "Mercado objetivo"
	},
	duplicates: {
		duplicatedLead: "Hay un lead duplicado",
		existingLead: "El lead existente ",
		fieldName: "tiene el mismo {{fieldName}}",
		mergeExisting: "Combinar con el lead existente",
		sameField: "El lead tiene el mismo {{fieldName}}"
	},
	duplicatesLayout: {
		createNewLead: "Crear nuevo prospecto",
		noResults: "Sin resultados para {{searchValue}} ",
		possibleMatches: "{{count}} posible coincidencia{{count > 1 ? 's' : ''}} para este lead en Bloobirds. <br /><b>¿Es uno de ellos?</b>",
		possibleMatches_one: "{{count}} posible coincidencia para este {{bobjectType}} en Bloobirds. <strong>¿Es uno de ellos?</strong>",
		possibleMatches_other: "{{count}} posible coincidencia para este {{bobjectType}} en Bloobirds. <strong>¿Es uno de ellos?</strong>",
		searchOnDB: "Buscar personas en la base de datos de Bloobirds",
		tryOtherTerms: "Prueba con otros términos de búsqueda"
	},
	leadPage: {
		optedOut: "Esta persona ha optado por no ser contactada de nuevo.",
		stageProspecting: "Etapa: Prospección",
		stageSales: "Etapa: Ventas",
		viewLeadInBB: "Ver lead en Bloobirds"
	},
	multipleCompaniesPage: {
		footerButtonText: "¿Ninguna de estas? Crea una nueva"
	},
	multipleLeadsPage: {
		createNewLead: "Crear nuevo lead",
		createNewLeadDisabled: "Sincronizar",
		footerInfo: {
			description: "Agregalo a Bloobirds👇",
			title: "Ninguno de estos leads"
		},
		footerLinkedin: {
			description: "Créalo aquí👇",
			title: "¿No lo encuentras?"
		},
		footerDisabledObjectCreation: {
			description: "Sincroniza a {{leadName}} con Bloobirds",
			title: "Ninguno de estos leads"
		},
		noResultsFound: "No se encontraron resultados para '{{searchValue}}'",
		otherSearchItem: "Intenta otros términos de búsqueda",
		searchInDatabase: "Buscar personas en la base de datos de Bloobirds",
		titleInfo: "El número de teléfono de esta persona <0/> no está listado en ningún contacto. <strong>Busca en tu base de datos o crea uno nuevo</strong>",
		titleLinkedin_one: "{{count}} posible coincidencia para este lead en Bloobirds. <strong>¿Es uno de ellos?</strong>",
		titleLinkedin_other: "{{count}} posibles coincidencias para este lead en Bloobirds. <strong>¿Es uno de ellos?</strong>"
	},
	navigateToProfileScreen: {
		captureInfo: "Solo podemos capturar la información de los leads cuando estás viendo su perfil.",
		tryProfile: "Intenta navegar al perfil.",
		viewExample: "VER EJEMPLO"
	},
	noContextPage: {
		currentTask: "Tarea actual",
		extraMile: "Más productividad. Mejor uso. 😎",
		searchPlaceholder: "Buscar aquí o usar {{commandText}} para abrir",
		stayOnTop: "Mantente al tanto de Salesforce mientras trabajas sin esfuerzo con Bloobirds y sus herramientas de contactabilidad."
	},
	noObjectsPage: {
		addParentCompany: "Agregar empresa matriz",
		addRelationship: "Agregar relación",
		noCompanyFound: "No se encontró ninguna empresa",
		noCompanyRelatedFound: "No se encontraron relaciones empresariales",
		noLeadFound: "No se encontraron prospectos",
		noOppFound: "No se encontraron oportunidades"
	},
	opportunityBriefCard: {
		closes: "Cierra"
	},
	overview: {
		activity: {
			attempts_one: "{{count}} intento",
			attempts_other: "{{count}} intentos",
			lastActivity: "Última actividad",
			lastAttempt: "Último intento",
			lastTouch: "Último contacto",
			touches_one: "{{count}} contacto",
			touches_other: "{{count}} contactos",
			viewAll: "Ver todo"
		},
		lastActivity: {
			noActivity: "Ninguna actividad registrada todavía 🏝️",
			noActivitySubtitle: "Aquí verás la ultima actividad de contacto realizada",
			since: "Desde el último contacto",
			lastContact: "Último contacto"
		},
		contacts_one: "{{count}} contacto",
		contacts_other: "{{count}} contactos",
		createAs: "Crear como {{bobject}}",
		createInSalesforce: "Crear en Salesforce",
		fields: {
			addFields: "Agregar campo para mostrar",
			dataFrom: "Datos de",
			noFieldsSelected: "🔍 No hay campos seleccionados",
			noSfdcFields: "No hay información de Salesforce disponible",
			searchHint: "Haz clic en la barra de búsqueda de arriba para comenzar a buscar. Una vez seleccionado, puedes arrastrar, reorganizar y eliminar cualquier campo a tu gusto."
		},
		leads: "Prospectos",
		noBobjectInThisBobject: "Ningún {{bobject1}} en esta {{bobject2}}",
		notSynced: "No sincronizado",
		relatedBobject: "{{bobject}} relacionados",
		relatedBobjectOpp: "{{bobject}} relacionadas",
		selectAll: "Seleccionar todos",
		sync: "Sincronizar",
		syncInBloobirds: "Sincronizar en Bloobirds",
		task: {
			createNewTask: "Crear nueva tarea",
			noPendingTask: "No hay tareas pendientes",
			noPermissionsTooltip: "No tienes los permisos necesarios para realizar esta acción",
			noResultPageDescription: "Parece que todo está hecho."
		},
		toasts: {
			cadenceTasksAdded: "Las tareas de cadencia ahora son visibles en la sección de Tareas de hoy.",
			cadenceTasksDeleted: "Las tareas de cadencia se han eliminado con éxito",
			contactSyncedError: "Hubo un error al sincronizar tu contacto, por favor, inténtalo de nuevo",
			contactSyncedSuccess: "Contacto sincronizado con éxito",
			createBobjectInSfdcError: "Hubo un error al sincronizar {{bobject}} en Salesforce: {{message}}",
			createBobjectInSfdcSuccess: "{{bobject}} sincronizado con éxito en Salesforce."
		},
		tooltips: {
			youCannotSelectOtherSource: "No puedes seleccionar otra fuente. Configura una integración para hacerlo."
		},
		wizardHelper: {
			allTasks: "Todas",
			clickToViewFutureTasks: "Haz clic en <strong>Todas las tareas</strong> para ver todas las tareas pendientes futuras.",
			managingTasks: "Gestionando tareas...",
			nextStepSuggested: "Siguiente paso sugerido",
			noTasksForToday: "No hay tareas para hoy 🌴",
			onCadence: "En cadencia",
			setCadence: "Establecer cadencia",
			startCadence: "Iniciar cadencia",
			todayTasks: "Tareas de hoy"
		}
	},
	relationObjects: {
		noResults: {
			description: "Para ver objetos relacionados en esta sección, configuralos <0>aquí</0>",
			title: "No hay objetos relacionados"
		}
	},
	salesNavUpgrade: {
		needToUpgrade: "Parece que necesitas actualizar tu cuenta de Sales Navigator para poder ver este perfil.",
		title: "Actualizar Sales Navigator"
	},
	settings: {
		captureLead: {
			assignToMe: "Asignar nuevos leads a mí",
			autoSync: "Auto sincronizar",
			autoSyncDescription: "Auto sincronizar Leads, Contactos, Cuentas y Oportunidades desde Salesforce cada vez que entres en su página de Salesforce.",
			autoSyncSalesforce: "Auto sincronizar desde Salesforce",
			autoHideLeftBarSetting: "Auto ocultar barra lateral",
			autoHideLeftBarSettingCheckbox: "Auto ocultar barra lateral en Salesforce",
			autoHideLeftBarSettingDescription: "Ocultar automáticamente la barra lateral al navegar por Salesforce mediante las tarjetas de la barra lateral izquierda",
			showOpportunityInWhatsapp: "Mostrar oportunidades de leads en WhatsApp",
			showOpportunityInWhatsappCheckbox: "Mostrar oportunidades automáticamente en WhatsApp",
			showOpportunityInWhatsappDescription: "Mostrar automáticamente oportunidades de leads al navegar por WhatsApp",
			connectSalesforceButton: "Conectar Salesforce",
			connectionSuccessful: "¡Te has conectado con éxito a Salesforce!",
			description: "De forma predeterminada, los nuevos leads se te asignarán. Desmarca la opción para establecerlos como \"Sin asignar\".",
			salesforceConnection: "Conexión con Salesforce"
		}
	},
	stageAndStatusLabel: {
		defaultStatus: "Nuevo",
		statusUpdatedSuccessfully: "Estado actualizado con éxito"
	},
	syncMessageInfo: {
		messagesSynced: "Los mensajes con este lead están sincronizados en Bloobirds",
		messagesSyncedInfo: "Tu historial completo de llamadas, correos electrónicos y mensajes de LinkedIn con este lead está disponible en Bloobirds.",
		syncMessages: " ¿Deseas sincronizar los mensajes de este lead?",
		syncMessagesDescription: "Los mensajes con este lead no pueden sincronizarse en Bloobirds. Para habilitar la sincronización, visita el perfil de Sales Navigator del lead y trata de capturarlo.",
		viewInBloobirds: "VER LEAD EN BLOOBIRDS",
		viewProfileButton: "VER PERFIL PARA SINCRONIZAR"
	},
	syncSalesforceList: {
		syncListInfo: {
			callout: "Solo los {{type}} que actualmente no existen y han sido asignados a un usuario mapeado específico se sincronizarán con Bloobirds.",
			checkBoxTextAccounts: "Crear empresas al sincronizar {{type}} sin una existente",
			checkBoxTextContacts: "Crear contactos asociados al sincronizar un {{type}}.",
			shouldCreateAccountsText: "Cuando se sincroniza un nuevo {{type}} y tiene una cuenta relacionada que no existe en Bloobirds, se creará automáticamente una empresa en el sistema.",
			shouldCreateContactsText: "Cuando se sincroniza un nuevo {{type}}, todos sus contactos relacionados se sincronizarán también.",
			titleAccounts: "Cuentas relacionadas",
			titleContacts: "Contactos relacionados"
		},
		syncListModal: {
			bulkMessages: {
				starting: "Iniciando acción masiva de lista...",
				synchronizeAll: "Estás a punto de sincronizar toda la lista. Contiene {{count}} {{type}}",
				synchronizeItems: "Estás a punto de sincronizar los {{count}} {{type}} seleccionados"
			},
			contentDownBlock: "no podemos enviar este tipo de objetos a Bloobirds a través de una lista. Actualmente, solo admitimos la sincronización de leads, contactos, cuentas y oportunidades de listas de Salesforce.",
			contentUpperBlock: "Estás intentando sincronizar objetos del tipo '{{type}}'. Desafortunadamente,",
			goBack: "Volver",
			noResults: "No hay {{type}} en esta lista. Cambia los filtros e intenta sincronizar una lista con objetos.",
			noSelected: "No hay objetos seleccionados. ¿Quieres sincronizar todos los objetos de la lista (esto utilizará todos los elementos de la lista y no solo los que son visibles en la página)?",
			recentSubtitle: "Desafortunadamente, no podemos sincronizar toda la lista a menos que selecciones algunos elementos de ella. Intenta seleccionar algunos elementos primero o cambia la lista.",
			recentTitle: "Estás intentando sincronizar objetos de una lista vista recientemente.",
			sync: "SINCRONIZAR",
			syncWholeList: "SINCRONIZAR TODA LA LISTA",
			title: "Sincronizar Salesforce {{type}} con Bloobirds",
			toasts: {
				error: "Hubo un error al sincronizar tus {{type}}. ¡Inténtalo de nuevo más tarde!",
				success: "Tus {{type}} se están sincronizando."
			}
		},
		changeSalesforceStatus: {
			toasts: {
				errorUpdating: "Hubo un error al actualizar la oportunidad {{error}}",
				success: "¡Estado actualizado con éxito!"
			}
		}
	},
	task: {
		createNewTask: "Crear nueva tarea",
		noPendingTask: "No hay tareas pendientes",
		noPermissionsTooltip: "No tienes los permisos necesarios para realizar esta acción",
		noResultPageDescription: "Parece que todo está hecho."
	},
	updateLeadWindow: {
		title: "El lead ha sido actualizado",
		viewInBloobirds: "Ver lead en Bloobirds",
		viewInBloobirdsQuestion: "¿Quieres ver el lead en Bloobirds?"
	},
	whatsappDuplicates: {
		callout: "Recomendamos editar los contactos y mantener solo <strong>un número de teléfono para cada persona.</strong>",
		headerText: "El número de teléfono de esta persona está listado en varios contactos existentes.",
		headerTextOpportunities: "El número de teléfono de esta persona está registrado en varias opportunidades existentes.",
		titleText: "Por favor, selecciona el correcto"
	}
};
var smartEmailModal = {
	components: {
		cancelEmailModal: {
			back: "Regresar",
			cancelEmail: "Cancelar correo electrónico",
			subtitle: "Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?",
			title: "Estás a punto de cancelar este correo electrónico. Esta acción eliminará la tarea y el correo electrónico no se enviará.",
			titleBulk_one: "Estás a punto de cancelar {{count}} correo electrónico. Esta acción eliminará las tareas y los correos electrónicos no se enviarán.",
			titleBulk_other: "Estás a punto de cancelar {{count}} correos electrónicos. Esta acción eliminará las tareas y los correos electrónicos no se enviarán.",
			toasts: {
				error: "Hubo un error al eliminar el correo electrónico, ¡inténtalo de nuevo!",
				success: "El correo electrónico se ha cancelado con éxito"
			}
		},
		confirmSendModal: {
			cancel: "Cancelar",
			content: "Existen <strong>cambios no guardados</strong>. Si deseas enviar el correo electrónico, la tarea <strong>no se creará. ¿Deseas continuar?</strong>",
			sendEmail: "Enviar correo electrónico",
			title: "Cambios no guardados"
		},
		messagingTemplatesButton: {
			noTemplateSelected: "Ninguna plantilla seleccionada",
			openTemplates: "Abrir plantillas",
			template: "Plantilla"
		},
		noDataPage: {
			subtitle: "Parece que no hay resultados para los criterios que has especificado",
			title: " No se pudo encontrar {{objectName}}"
		},
		noResultsPage: {
			subtitle: "Las actividades con los leads seleccionados se mostrarán aquí",
			title: "No hay actividades registradas aún"
		},
		previewActivityModal: {
			title: "Vista previa de correo electrónico"
		},
		recipientSearchInput: {
			header: {
				allRelatedEmailsHaveBeenAdded: "Todos los correos electrónicos relacionados han sido añadidos. Busca de forma global para añadir más",
				cannotSearchEmailsInCopmany: "No se pueden buscar correos electrónicos en la empresa si no se ha seleccionado un correo electrónico válido",
				coworkersEmails: "Compañeros de trabajo",
				currentEmailDoesNotHaveCompany: "El correo electrónico actual no está asociado a una empresa. Busca de forma global para añadir nuevos correos electrónicos",
				searchEverywhere: "En todas partes",
				searchInCompany: "De la empresa"
			},
			noContactsWithSearchTerm: "No hay resultados que coincidan con los criterios de búsqueda",
			noContactsWithoutSearchTerm: "Escribe algo para mostrar una lista de resultados",
			notRegisteredTooltip: "Este correo electrónico no está registrado en ningún objeto de Bloobirds. Créalo ahora para registrar su actividad.",
			outsiderTooltip: "Ten precaución al compartir información confidencial. {{email}} está fuera de la organización original del hilo.",
			selectableItemTooltip: "Ten precaución al compartir información confidencial. isabelgaperez@soylandsl.es está fuera de la organización original del hilo."
		},
		saveWithNoSlotsModal: {
			backAndEdit: "Regresar y editar",
			"continue": "Continuar sin selección",
			modalContentText: "<strong>No puedes guardar una plantilla con propuesta de horas</strong> ya que los enlaces <strong>expirarán</strong>. Al hacer clic en continuar, eliminarás las horas propuestas del cuerpo del correo y guardarás la plantilla.",
			saveTemplate: "Guardar plantilla"
		},
		scheduleEmailModal: {
			africa: "África",
			america: "América",
			antarctica: "Antártida",
			asia: "Asia",
			australia: "Australia",
			cancel: "Cancelar",
			companyTimezone: "Zona horaria de la empresa",
			dateTimeFromSelectedTimezone: "Fecha y hora desde la zona horaria seleccionada",
			europe: "Europa",
			leadTimezone: "Zona horaria del prospecto",
			myTimezone: "Mi zona horaria",
			selectDateAndTime: "Seleccionar fecha y hora",
			send: "Enviar",
			title: "Programar envío",
			today: "Hoy",
			tomorrowAfternoon: "Mañana por la tarde",
			tomorrowMorning: "Mañana por la mañana",
			tooltip: "No se puede reprogramar una tarea a una fecha pasada"
		},
		sendEmailModal: {
			back: "Regresar",
			bulk: "Estás a punto de intentar enviar o reenviar ##EMAILS_NUMBER## correos electrónicos. Asegúrate de verificar que el contenido sea correcto antes de enviarlos.",
			cannotBeUndonde: "<strong>Esta acción no se puede deshacer</strong>, ¿estás seguro de que deseas continuar?",
			retry: "Estás a punto de intentar enviar este correo electrónico nuevamente. Asegúrate de verificar que el contenido sea correcto antes de enviarlo.",
			retrySend: "Reintentar enviar correo electrónico",
			send: "Estás a punto de enviar un correo electrónico. Asegúrate de verificar que el contenido sea correcto antes de enviarlo.",
			sendButton_one: "Enviar correo electrónico",
			sendButton_other: "Enviar correos electrónicos",
			sendEmail: "Enviar correo electrónico",
			toasts: {
				delay: "El correo electrónico tuvo un pequeño retraso 😞. Por favor, verifica si se envió correctamente.",
				error: "Al intentar enviar el correo electrónico, algo salió mal. Por favor, verifica los detalles de la tarea y vuelve a intentarlo más tarde.",
				success: "Los correos electrónicos se han enviado exitosamente"
			}
		}
	},
	createLeadTab: {
		changeFromField: "Cambiar campos de formulario en Bloobirds",
		createLead: "Crear lead",
		discard: "Descartar",
		missingInfo: "¿Falta alguna información aquí?",
		newLead: "Nuevo lead",
		toasts: {
			success: "Nuevo lead creado"
		}
	},
	createTaskTab: {
		assignedTo: "Asignado a",
		createTask: "Crear tarea",
		descriptionPlaceholder: "Escribe la descripción de tu tarea...",
		discard: "Descartar",
		dueDate: "Fecha",
		newTask: "Nueva tarea",
		object: "Objeto",
		toasts: {
			success: "Tarea creada exitosamente"
		}
	},
	newEmail: "Nuevo correo electrónico",
	untitledMeeting: "Reunión",
	pastActivityTab: {
		activities: "Actividades",
		title: "Actividad pasada"
	},
	playbookTab: {
		header: {
			back: "Atrás",
			deleteTemplate: "Eliminar plantilla",
			editTemplate: "Editar plantilla",
			insert: "Insertar",
			insertTemplate: "Insertar plantilla",
			use: "Usar",
			userCantEdit: "Solo el propietario o un administrador pueden eliminar esta plantilla"
		}
	},
	previewTab: {
		banner: {
			error: "Corrige las variables para enviar el correo.",
			standard: "Vista previa del correo una vez enviado"
		}
	},
	similarDealsTab: {
		datePlaceholder: "Selecciona un rango de tiempo",
		deals: "Ofertas",
		infoBanner: {
			checkBox: "No mostrar esto de nuevo",
			content: "Las Ofertas Ganadas Similares es una <strong>poderosa herramienta de datos</strong>. Te muestra prospectos pasados que comparten el mismo escenario que el actual. Esto nos lleva a la pregunta: <strong>¿Por qué estás utilizando diferentes soluciones para el mismo problema?</strong> Descubre cómo esta potente herramienta puede ayudarte.",
			learnMore: "Más información",
			title: "Ya has estado aquí antes"
		},
		matchesInSame: " Coincidencias en lo mismo:",
		noDeals: {
			subtitle: "Intenta cambiar tu búsqueda para obtener resultados",
			title: "No hay ofertas con los mismos criterios"
		},
		title: "Ofertas ganadas similares"
	},
	tabs: {
		calendarTab: "Calendario",
		createLeadTab: "Crear lead",
		createTaskTab: "Nueva tarea",
		pastActivityTab: "Actividad pasada",
		previewTab: "Vista previa",
		similarWonDealsTab: "Ofertas ganadas similares",
		suggestionsTab: "Sugerencias",
		templatesTab: "Plantillas y Fragmentos"
	}
};
var tasks = {
	newTask: "Nueva tarea: ",
	taskForm: {
		addTask: "Agregar tarea",
		assignedTo: "Asignado a",
		deleteTask: "Eliminar tarea",
		dueDate: "Fecha",
		placeholder: "Describe tu tarea... ",
		saveTask: "Guardar tarea"
	},
	taskTypeSelector: {
		addNew: "Agregar nuevos tipos de tareas",
		askYourManager: "Pídele a tu supervisor que cree un nuevo tipo de tarea",
		call: "Llamada",
		email: "Correo electrónico",
		missingTask: "¿Falta un tipo de tarea?",
		task: "Tarea",
		taskTypes: "Tipos de tarea"
	},
	toasts: {
		bulkCompletedSuccess_one: "Se completó {{count}} tarea exitosamente.",
		bulkCompletedSuccess_other: "Se completaron {{count}} tareas exitosamente.",
		completedSuccess: "¡Tarea completada exitosamente!",
		deleteSuccess: "¡Tarea eliminada con éxito!",
		success: "¡Tarea creada con éxito!",
		updateSuccess: "¡Tarea actualizada con éxito!"
	}
};
var taskFeed = {
	noTasks: "Tareas completadas 🌴 ",
	noTasksHint: "Toma un descanso o cambia los filtros para ver más",
	loadMoreTasks: "Cargar mas",
	closeTasks: "Cerrar Tareas",
	reminders: "Recordatorios",
	scheduledTasks: "Con hora",
	dailyTasks: "Diarias",
	overdueTasks: "Vencidas",
	completedTasks: "Completadas",
	markClusterDone: "Completar todas",
	clusterMarkedAsDone: "Grupo de tareas marcado como completado correctamente",
	reload: "Tareas recargadas con éxito",
	reloadTooltip: "Recargar tareas",
	confirmMarkAsDoneModal: {
		title: "Marcar tareas como completadas",
		description: "¿Estás seguro de que deseas marcar todas las tareas seleccionadas como completadas?",
		cancel: "Cancelar",
		confirm: "Confirmar"
	}
};
var templateSelector = {
	login: "Iniciar sesión",
	loginMessage: "Inicia sesión para ver plantillas",
	myTemplates: "Mis plantillas",
	noResults: {
		addTemplate: "+ Añadir plantilla",
		noResultsFound: "No se encontraron resultados"
	},
	permissions: "No tiene los permisos necesarios para realizar esta acción",
	playbookRecommendations: {
		info: "Si el cliente potencial está en Bloobirds, aquí verás tus recomendaciones basadas en la segmentación de tu Playbook",
		title: "Recomendaciones de Playbook"
	},
	suggestedTemplates: {
		info: "Si el cliente potencial está en Bloobirds, aquí verás tus recomendaciones basadas en la segmentación de tu Playbook",
		title: "Plantillas sugeridas"
	},
	resync: {
		resync: "Resinc",
		tooltip: "¿Faltan mensajes en Bloobirds? Haz clic para resincronizar la conversación"
	},
	search: "Buscar...",
	teamTemplates: "Plantillas de equipo",
	tooltipWithLead: "{{lead}} existe en Bloobirds, las variables se sustituirá automáticamente",
	tooltipWithoutLead: "El prospecto no se encontró en Bloobirds, vamos a tratar de reemplazar las variables basadas en la información de Linkedin"
};
var tooltips = {
	blankPageTooltip: {
		description: "Ahora puedes adjuntar una plantilla de correo electrónico a una tarea de cadencia con un correo electrónico. No te enfrentes a una página en blanco en tus tareas diarias ✨",
		title: "Di adiós a la ansiedad de la página en blanco 👋 "
	},
	contactsTooltip: {
		extensionName: "Extensión de Chrome de Bloobirds",
		navigateToProfile: "Navega al perfil de un contacto para ver la burbuja en acción."
	},
	customTasksDT: {
		description: "Mensajes de WhatsApp, invitaciones de LinkedIn, reuniones en persona... Si está en tu proceso de ventas, entonces también puede estar en Bloobirds.",
		title: "¡Comienza a registrar actividades personalizadas ahora!"
	},
	gotIt: "¡Entendido!",
	homePageTooltip: {
		description: "Detalles de contacto en una vista basada en la empresa, historial completo de actividades, herramientas de contactabilidad, contenido personalizado...",
		title: "La Bubble 🫧: La ayuda proactiva que necesitas."
	},
	inviteesDT: {
		description: "Ahora puedes eliminarte como invitado de la reunión, además de agregar más invitados internos y externos, y todo esto sincronizado en tu cuenta de calendario. ✨",
		title: "¡Puedes sincronizar a tus invitados!"
	},
	slotsTooltip: {
		footer: "Comparte tus horarios libres para que tus contactos sepan cuando estas disponible para un meeting ¡Y puedan programarlo con antelacion! ✨ ",
		title: "Di a tus contactos cuando estas disponible para un meeting 📆",
		ok: "De acuerdo",
		buttonText: "Saber más"
	},
	knowMore: "Saber más",
	ok: "De acuerdo",
	watchNow: "Ver ahora",
	watchVideo: "Ver vídeo"
};
var validation = {
	email: "Este no es un correo electrónico válido"
};
var welcomeScreens = {
	otoSlides: {
		commonScreen: {
			animationText: "Bloobirds transforma la lista clásica de CRM en una lista de tareas fácil de seguir ✨",
			buttonText: "Continuar",
			title: "🤔 uhhmm espera... ¿por qué <0>Bloobirds</0>?"
		},
		firstScreen: {
			buttonText: "Cuéntame más",
			content: "En 3 minutos, Bloobirds transforma tu Salesforce en un increíble software<0/> para tu equipo de ventas. Más productividad. Mejor uso. Más datos.",
			subtitle: "Bienvenido a <0>Bloobirds</0>, {{name}}!",
			title: "<0>La aplicación de Salesforce #1</0> <1>para aumentar la productividad en ventas</1>"
		},
		guideScreen: {
			buttonText: "Comencemos"
		},
		lastScreen: {
			startBloobirds: "Descubre lo que Bloobirds tiene para ofrecer",
			title: "Bienvenido a <0>Bloobirds</0>"
		},
		secondScreen: {
			animationText: "Cambiar entre diferentes aplicaciones es cosa del pasado ✨",
			buttonText: "Continuar",
			content: "Realiza llamadas, envía y recibe correos electrónicos y mensajes de LinkedIn <0>sin salir de Salesforce.</0>\n Toda la actividad se registra automáticamente",
			title: "🤔 uhhmm espera... ¿por qué <0>Bloobirds</0>?"
		}
	},
	screenTexts: {
		letSystemRemindYou: "Permite que el<0/> sistema te <strong>recuerde</strong>."
	}
};
var notifications = {
	meetingDone: "Reportar resultado de la reunión con {{name}}",
	email: "Correo electrónico de {{name}}",
	linkedIn: "Mensaje de LinkedIn de {{name}}",
	noCompanyAssigned: "No hay empresa asignada",
	cadenceEnded: "La cadencia {{name}} ha finalizado",
	cadenceEndedGeneric: "Cadencia finalizada",
	opportunityCompany: "La empresa {{companyName}} de {{relationship}} ha creado una oportunidad.",
	companyRelatedAccount: "La empresa {{companyName}} de {{relationship}} ahora está en el estado CUENTA.",
	companyRelatedClient: "La empresa {{companyName}} de {{relationship}} ahora está en el estado CLIENTE.",
	relatedCompanyMeeting: "La empresa {{companyName}} de {{relationship}} tuvo una reunión.",
	relatedCompanyOpportunity: "La empresa {{companyName}} de {{relationship}} ha creado una oportunidad.",
	relatedCompanyActivityInbound: "La empresa {{companyName}} de {{relationship}} ha tenido una actividad entrante",
	relatedCompanyLeadInbound: "La empresa {{companyName}} de {{relationship}} ha tenido un nuevo lead entrante.",
	inboundNotification: "Actividad entrante de {{name}}",
	inboundAcquisitionFormNotification: "Actividad entrante de {{name}} a través de {{acquisitionForm}}",
	newSalesCompany: "¡Nuevas empresas de ventas asignadas!\n¡Échales un vistazo!",
	newProspectingCompany: "¡Nuevas empresas de prospección asignadas!\n¡Échales un vistazo!",
	newSalesLead: "¡Nuevos leads de ventas asignados!\n¡Échales un vistazo!",
	newProspectingLead: "¡Nuevos leads de prospección asignados!\n¡Échales un vistazo!",
	meetingBooked: "¡{{name}} hizo clic en el enlace de la reunión! Mantente atento",
	importDone: "Importación completada con éxito",
	importDoneWithIssues: "Importación completada pero algunos objetos no pudieron procesarse",
	importFailed: "Fallo en la importación",
	leadCall: "Llamada perdida de {{name}}",
	reportCallResult: "Informe del resultado de la llamada para {{name}}",
	reportCall: "Llamada de {{phone}}",
	leadWithoutCompany: "Lead sin empresa",
	nylasAccountStopped: "Tu conexión de correo electrónico se detuvo y necesita ser reconectada",
	emailOpened: "Correo electrónico abierto por {{name}}",
	emailOpenedSubject: "Correo electrónico abierto: {{name}}",
	linkClicked: "Enlace clickeado por {{name}}",
	linkClickedSubject: "Enlace clickeado: {{name}}",
	syncSalesforceListDoneWithIssues: "Lista de Salesforce sincronizada pero algunos objetos no pudieron procesarse",
	syncSalesforceListFailed: "Fallo en la sincronización de la lista de Salesforce",
	syncSalesforceListDone: "Lista de Salesforce sincronizada con éxito"
};
var reminders = {
	reportCallBulk: "Reportar {{count}} llamadas pendientes",
	reportCallBulkButton: "Reportar en Inbox"
};
var whatsapp = {
	chat: {
		today: "Hoy",
		yesterday: "Ayer"
	},
	conversation: {
		alreadySynced: "Conversación ya sincronizada",
		errorSending: "Se ha producido un error enviando el mensaje de WhatsApp",
		errorSyncing: "Error sincronizando la conversación",
		noContactMatch: "El contacto debe estar sincronizado",
		syncWithBoobject: "Sincronizar todos los mensajes visibles de {{name}}",
		syncing: "Sincronizando la conversación",
		writeMessage: "Escribe un mensaje"
	},
	lead: "Contacto de bloobirds",
	messages: {
		alreadySynced: "Mensaje ya sincronizado",
		errorSyncing: "Error sincronizando el mensaje",
		noContactMatch: "El contacto debe estar sincronizado",
		syncWithBoobject: "Sincronizar mensaje de {{name}}",
		syncing: "Sincronizando el mensaje"
	},
	toast: {
		error_one: "Hay un problema sincronizando el mensaje de {{name}}",
		error_other: "Hay un problema sincronizando los mensajes de {{name}}",
		success_one: "Mensaje de {{name}} sincronizado correctamente",
		success_other: "Mensajes de {{name}} sincronizados correctamente"
	}
};
var wizards = {
	common: {
		back: "Atrás",
		cancel: "Cancelar",
		confirm: "Confirmar",
		next: "Siguiente",
		requiredMessage: "Falta información requerida",
		saveAndClose: "Guardar",
		skipWizard: "Saltar",
		untitledCompany: "Empresa sin título"
	},
	modals: {
		inactiveHandlingModal: {
			title: "Esta {{bobjectType}} se volverá inactiva"
		},
		meetingReportResultModal: {
			title: "Informe del resultado de la reunión"
		},
		changeStatusModal: {
			title: "Actualizar Estado"
		}
	},
	steps: {
		addLeadToActivityModal: {
			callout: "Registre este número si desea que las llamadas futuras estén asociadas a este prospecto.",
			checkbox: " Actualizar también el número de teléfono del lead con el número de llamada",
			title: "Asignar llamada a un prospecto",
			subtitle: "Busca el prospecto al que quieres asignar la llamada",
			toast: {
				error: "Hubo un problema al asignar el prospecto.",
				success: "¡Prospecto asignado con éxito!"
			}
		},
		bobjectForm: {
			createTitle: "Crear nueva oportunidad",
			editTitle: "Editar oportunidad",
			none: "Ninguno",
			requiredMessage: "Este campo es obligatorio",
			toasts: {
				errorCreating: "Hubo un error al crear la oportunidad {{error}}",
				errorUpdating: "Hubo un error al actualizar la oportunidad {{error}}"
			}
		},
		taskManagement: {
			buttons: {
				back: "Atrás",
				finish: "Finalizar reporte"
			},
			taskActions: {
				titles: {
					cadenceOnGoing: "Cadencia en curso",
					noTasks: "No hay tareas programadas",
					nextSteps: "Hay tareas pendientes"
				},
				subtitles: {
					cadenceOnGoingSubtitle: "Aún hay tareas de cadencia pendientes",
					noTasksSubtitle: "No hay tareas programadas para los próximos días",
					nextStepsSubtitle: "Hay tareas programadas en los próximos días"
				},
				buttonsTitle: {
					stopCadence: "Parar cadencia",
					addNextSteps: "Añadir siguiente paso",
					startCadence: "Lanzar cadencia",
					changeCadence: "Cambiar cadencia",
					rescheduleCadence: "Reprogramar cadencia",
					stopCadenceLoading: "Paraado cadencia",
					addNextStepsLoading: "Añadiendo siguiente paso",
					startCadenceLoading: "Lanzando cadencia",
					changeCadenceLoading: "Cambiando cadencia",
					rescheduleCadenceLoading: "Reprogramando cadencia"
				}
			}
		},
		callResult: {
			at: "a las",
			callResult: "¿Cuál es el resultado de la llamada?*",
			didYouPitch: "¿Pudiste realizar tu presentación?",
			endFlowHere: "Finalizar el flujo de informe de llamada aquí",
			endFlowHereDisclaimer: "Esto se puede cambiar en cualquier momento.",
			from: "de",
			info: "Información de {{name}}",
			pitchPlaceholder: "Presentación utilizada",
			title: "Acabas de terminar una llamada con {{name}}",
			titleNoName: "Acabas de terminar una llamada",
			updateNumber: "¿Deseas actualizar alguno de los números registrados?",
			"with": "con",
			recallTaskTitle: "Rellamada",
			updateProperty: {
				title: "Actualizar"
			},
			recall: {
				toast: "¡Tarea creada con éxito!",
				sectionText: "Crear una tarea para llamar de nuevo en",
				options: {
					in1Hour: "En 1 hora",
					in2Hours: "En 2 horas",
					in4Hours: "En 4 horas",
					tomorrowMorning: "Mañana por la mañana",
					tomorrowAfternoon: "Mañana por la tarde",
					custom: "Seleccionar fecha y hora personalizada"
				},
				selectedDate: "Fecha y hora seleccionadas",
				okButton: "Ok"
			}
		},
		callResultOpp: {
			ableToContact: "¿Has podido contactar?*",
			addANote: "Agregar una nota",
			addInfo: "¿Deseas agregar alguna información?",
			no: "No",
			placeholder: "Comienza a escribir tu nota aquí...",
			yes: "Sí"
		},
		changeSalesStatus: {
			leadStatusPlaceholder: "Razón del estado de {{status}}",
			reason: "¿Cuál es la razón del cambio de estado?",
			title: "¿Quieres actualizar el estado de {{bobjectType}}?"
		},
		changeStatus: {
			companiesStatusMessage: "<strong>El estado de la empresa seleccionada detendrá la cadencia.</strong> Toda comunicación futura debe programarse manualmente y basarse en lo que discutiste durante tu llamada.",
			leadStatusTexts: {
				LEAD__STATUS__CONTACT: "Necesito crear una oportunidad o revisar una existente",
				LEAD__STATUS__CONTACT_NO_CREATE_LEAD: "El lead es un nuevo contacto para crear una futura oportunidad",
				LEAD__STATUS__CONTACTED: "Me puse en contacto con el lead, pero aún no está interesado",
				LEAD__STATUS__DISCARDED: "Debería dejar de contactar al lead y descartarlo",
				LEAD__STATUS__ENGAGED: "Me puse en contacto con el lead, ¡está interesado!",
				LEAD__STATUS__MEETING: "El lead aceptó una reunión y necesito programarla",
				LEAD__STATUS__NURTURING: "Debería dejar de contactar al lead y volver a intentarlo en el futuro",
				LEAD__STATUS__ON_PROSPECTION: "No pude comunicarme con el lead y quiero seguir intentándolo"
			},
			placeholder: "Razón del {{bobject}} {{status}}",
			toasts: {
				success: "¡Estado actualizado con éxito!"
			},
			tooltipDictionary: {
				COMPANY__STATUS__CONTACTED: "Se utiliza cuando tienes un contacto correcto. Te has puesto en contacto con la persona adecuada",
				COMPANY__STATUS__DISCARDED: "Se utiliza cuando las preguntas de calificación indican que la empresa no es un cliente potencial. Esto cambiará el estado de todos los leads dentro de la empresa a estado de Descartado",
				COMPANY__STATUS__ENGAGED: "Se utiliza cuando uno de los leads tiene el estado de Comprometido. El estado de la empresa cambia en consecuencia.",
				COMPANY__STATUS__MEETING: "Se utiliza cuando has programado una reunión entre un lead y el ejecutivo de cuentas",
				COMPANY__STATUS__NURTURING: "Se utiliza cuando no ha sido posible ponerse en contacto con ningún lead dentro del período de la cadencia. Esto cambiará el estado de todos los leads dentro de la empresa a estado de Nurturing.",
				DEFAULT_TEXT: "El estado del lead y la empresa están estrechamente relacionados, por lo que dependiendo del estado de lead seleccionado, el estado de la empresa también puede cambiar.",
				HEADER_TEXT: "El estado del lead y la empresa están estrechamente relacionados, por lo que dependiendo del estado de lead seleccionado, el estado de la empresa también puede cambiar.",
				LEAD__STATUS__CONTACTED: "Se utiliza cuando te has puesto en contacto con el lead",
				LEAD__STATUS__DISCARDED: "Se utiliza cuando el lead no es un contacto adecuado para continuar prospectando",
				LEAD__STATUS__ENGAGED: "Se utiliza cuando el lead está interesado y ha respondido las preguntas de calificación",
				LEAD__STATUS__MEETING: "Se utiliza cuando has programado una reunión entre el lead y el ejecutivo de cuentas",
				LEAD__STATUS__NURTURING: "Se utiliza cuando no pudiste contactar al lead dentro del período de la cadencia pero deseas intentarlo de nuevo más tarde"
			},
			whatReason: "¿Cuál es la razón del cambio de estado?"
		},
		customObject: {
			errorToast: "Hubo un error al crear el objeto en Salesforce {{error}}",
			none: "Ninguno",
			requiredMessage: "Este campo es obligatorio"
		},
		inactiveHandling: {
			actionForm: {
				addTask: {
					placeholders: {
						assignedTo: "Asignado a",
						scheduleTime: "Hora programada",
						title: "Título *"
					},
					title: "Agregar detalles de la tarea"
				},
				discard: {
					title: "Razón descartada*",
					titleOpp: "Razón de pérdida de cierre*"
				},
				onHold: {
					placeholder: "Razón de espera *",
					title: "¿Cuál es la razón para poner en espera?"
				},
				previousAssign: {
					assignToMe: "Asignármelo",
					keepOwner: "Mantener al propietario actual",
					subtitle: "Este {{bobjectType}} no está asignado a ti. Las tareas de la cadencia siempre se asignan al <strong>propietario actual.</strong>",
					title: "¿A quién quieres asignárselo?"
				},
				reassign: {
					placeholder: "Asignado a",
					title: "Seleccione un colega para reasignar"
				}
			},
			actions: {
				backlogUnassign: "Enviar de nuevo al backlog y desasignar",
				createNextStep: "Crear un próximo paso",
				enrollCadence: "Inscribirse en una nueva cadencia",
				reassign: "Reasignar",
				sendToHold: "Enviar a estado en espera",
				sendToNurturing: "Enviar a Nurturing e iniciar cadencia"
			},
			company: {
				actionText: "¿Cuál es la razón para descartar la empresa y los leads?",
				discardCompanyAndLeads: "Descartar una empresa detendrá su cadencia o tareas, pero permanecerá en la base de datos.",
				discardedRadioText: "Descartar empresa y leads",
				setBacklogAndUnassign: "Si crees que esta empresa es candidata para un nuevo comienzo, selecciona esta opción y envíala de nuevo al backlog para ser reasignada."
			},
			confirm: "Confirmar",
			informationPanel: {
				backToBacklog: {
					title: "👉 ¿Estás pensando en empezar desde cero?"
				},
				discard: {
					subtitle: "Es posible encontrarlo en las listas y subhogares, filtrando por el estado 'Descartado'.",
					title: "👋 ¿Crees que no puedes hacer más?"
				},
				newCadence: {
					description: "Esta tarea aparecerá en tu hogar y subhogares el día programado.",
					link: "<0>Haz clic aquí</0> si deseas obtener más información sobre las cadencias",
					subtitle: "Inscríbelo en una nueva cadencia y vuelve a intentar comunicarte.",
					title: "💬 ¿Crees que debes seguir insistiendo?"
				},
				nextStep: {
					description: "Esta tarea aparecerá en tu hogar y subhogares el día programado.",
					link1: "Además, recibirás una notificación si tienes <0>recordatorios</0> activados.",
					link2: "<0>Haz clic aquí</0> si deseas obtener más información sobre las tareas.",
					subtitle: "Crea una tarea para que no se te olvide.",
					title: "✨ ¿Estás seguro de qué hacer a continuación?"
				},
				onHold: {
					subtitle: "Selecciona esta opción si crees que esta empresa o contacto no debe ser descartado ni enviado a crianza, sino que esperas hacer algo con él en el futuro.",
					title: "👉 No quiero hacer nada"
				},
				reassign: {
					subtitle: "Selecciona esta opción si crees que esta empresa o contacto debería ser trabajado por otro colega, por ejemplo, porque pertenece a un mercado objetivo que no te corresponde.",
					title: "👉 ¿Crees que otro colega debería trabajarlo?"
				},
				sendToNurturing: {
					link1: "Esta tarea aparecerá en tu hogar y subhogares el día programado. Recuerda que las <0>cadencias automatizadas</0> son muy útiles para la crianza.",
					link2: "<0>Haz clic aquí</0> para obtener más información sobre cómo mejorar tu proceso de crianza.",
					subtitle: "La crianza es un estado activo utilizado para mantener un contacto mínimo y/o compartir contenido para seguir intentando convertir una empresa o contacto.",
					title: "🔄 ¿Crees que no está todo perdido?"
				}
			},
			lead: {
				actionText: "¿Cuál es la razón para descartar el lead?",
				discardCompanyAndLeads: "Descartar un lead detendrá su cadencia o tareas, pero permanecerá en la base de datos.",
				discardedRadioText: "Descartar lead",
				setBacklogAndUnassign: "Si crees que este lead es candidato para un nuevo comienzo, selecciona esta opción y envíalo de nuevo al backlog para ser reasignado."
			},
			missingInfoTooltip: "Falta información requerida",
			opportunity: {
				actionText: "¿Cuál es la razón para cerrar la oportunidad?",
				discardCompanyAndLeads: "Descartar una oportunidad detendrá su cadencia o tareas, pero permanecerá en la base de datos.",
				discardedRadioText: "Cerrar oportunidad",
				setBacklogAndUnassign: "Si crees que esta oportunidad es candidata para un nuevo comienzo, selecciona esta opción y envíala de nuevo al backlog para ser reasignada."
			},
			toasts: {
				backToBacklog: "{{bobjectType}} enviado de nuevo al backlog y desasignado",
				companyAndLeads: "empresa y sus contactos",
				discard: "El {{bobjectType}} ha sido descartado",
				discardCompany: "La empresa y los contactos se han descartado",
				newCadence: "Se ha programado una cadencia",
				nextStep: "¡Tarea creada!",
				onHold: "El estado del {{bobjectType}} ha cambiado a En espera",
				onHoldCompany: "El estado de la empresa y los contactos ha cambiado a En espera",
				reassign: "{{bobjectType}} ha sido reasignado al usuario seleccionado",
				sendToNurturing: "Se ha programado una cadencia de crianza para el {{bobjectType}}"
			}
		},
		meetingReportResult: {
			meetingResult: "¿Cuál es el resultado de la reunión?*",
			meetingType: "Tipo de reunión",
			title: "Acabas de terminar una reunión con {{name}}"
		},
		meetingResultNotes: {
			addCallNotes: "Agregar notas",
			addMeetingNotes: "Agregar notas",
			addNotes: "Agregar notas",
			createNew: "Crear nueva",
			emptyPlaceholder: "Todavía no tienes notas en este objeto, <1>¡crea una para continuar!</1>"
		},
		notesAndQQs: {
			addANote: "Agregar una nota",
			fillTheQQs: "Completar las preguntas de calificación",
			howWasTheCall: "¿Cómo fue la llamada?",
			placeholder: "Comienza a escribir tu nota aquí..."
		},
		opportunityControl: {
			choose: "Elige entre tus oportunidades activas para continuar",
			"continue": "Continuar sin oportunidad",
			edit: "Editar una oportunidad existente",
			title: "¿Qué deseas hacer con tus oportunidades?"
		},
		scheduleNextSteps: {
			assignedTo: "Asignado a",
			descriptionPlaceholder: "Describe tu tarea...",
			dueDate: "Fecha",
			saveAndSchedule: "Guardar y programar el próximo paso"
		}
	},
	titles: {
		bobjectForm: "Oportunidad",
		callResult: "Informe del resultado de la llamada",
		callResultOpp: "Informe del resultado de la llamada",
		changeSalesStatus: "Actualizar el estado",
		changeStatus: "Actualizar el estado y decidir el siguiente paso",
		changeStatusSalesforce: "",
		convertObject: "Enviar a ventas",
		customObject: "Crear objeto personalizado",
		crmUpdates: "Actualizaciones del CRM",
		initial: "",
		notes: "Notas",
		notesAndQQs: "Informe del resultado de la llamada",
		onlyQQs: "Preguntas de calificación",
		opportunityControl: "Control de oportunidades",
		opportunityControlOTO: "Oportunidad",
		scheduleNextSteps: "Crear el próximo paso",
		addLeadToActivity: "Añadir contacto a la actividad",
		statusNoteActions: "Estado, Nota y acciones rápidas",
		taskManagement: "Gestión de tareas"
	}
};
var tasksTitles = {
	contactBeforeMeeting: "Contactar antes de la reunión",
	cadenceStep: {
		"1": "1er paso",
		"2": "2do paso",
		"3": "3er paso",
		other: "{{number}}º paso"
	},
	timezone: "Son las {{hour}} en {{location}}",
	timezoneError: "El usuario está en {{location}}",
	call: "Llamada",
	email: "Correo",
	inbound: "Entrante",
	linkedin: "LinkedIn",
	meeting: "Reunión",
	whatsapp: "Whatsapp",
	task: "Tarea",
	customActivity: "Actividad personalizada",
	other: "Otro"
};
var signatures = {
	selectToolbarEmail: {
		edit: "Editar firmas",
		create: "Crear firmas"
	}
};
var userSetings = {
	email: {
		connections: {
			title: "Tus cuentas de correo conectadas",
			empty: "No tienes cuentas conectadas. Conecta tu primera cuenta con Google u Outlook"
		},
		tracking: {
			title: "Notificaciones de seguimiento de correo electrónico",
			notifyCheck: "Notificarme cuando un cliente potencial abre, hace clic o responde a mis correos electrónicos"
		},
		signature: {
			title: "Administrar tu firma de correo electrónico",
			subtitle: "Editar y administrar tus firmas de correo electrónico",
			addCheck: "Agregar mi firma al final cuando redacto correos electrónicos",
			changeCheck: "Habilitar cambio de firma cuando redacto correos electrónicos",
			"new": "Nuevo",
			preview: "Vista previa HTML",
			html: "HTML",
			bloobirdsEditor: "Editor",
			noSelected: {
				title: "No tienes ninguna firma seleccionada.",
				subtitle: "Crea una o selecciona una para empezar a editarla"
			},
			checkSignatureSettings: {
				title: "Ya tienes una firma creada",
				subtitle: "Si deseas agregar otra o modificar la existente, haz clic a continuación",
				button: "Administrar firmas"
			},
			noCreated: {
				title: "No hay firmas creadas",
				subtitle: "¡Crea una para empezar a personalizar tus correos electrónicos!",
				button: "Crear una nueva firma"
			},
			dirtyModal: {
				title: "Cambios no guardados",
				text: "Si comienzas a crear otra firma, perderás los cambios no guardados en la firma actual",
				question: "¿Deseas continuar?"
			},
			confirmationModal: {
				title: "Eliminar firmas",
				text: "Si eliminas esta firma, la perderás <strong>permanentemente</strong> y tendrás que crearla nuevamente para usarla.",
				question: "¿Deseas continuar?"
			},
			modal: {
				cancel: "Cancelar",
				"continue": "Continuar",
				confirm: "Confirmar"
			},
			htmlInvalid: "El HTML de la firma no es válido, puede contener etiquetas no cerradas o caracteres no válidos",
			richTextInvalid: "La firma no es válida, puede contener caracteres no válidos",
			saved: "Firma guardada exitosamente",
			namePlaceholder: "Nombre de la firma...",
			nameRequired: "Se requiere un nombre para la firma",
			htmlPlaceholder: "Crea o pega tu firma HTML aquí...",
			discard: "Descartar",
			save: "Guardar",
			tooltips: {
				setAsDefault: "Marcar como predeterminado. Se utiliza al redactar y programar correos electrónicos",
				"delete": "Eliminar firma"
			}
		}
	}
};
var taskFeedErrorPage = {
	title: "No se pueden cargar tareas",
	subtitle: "Se produjo un error al cargar tus tareas. Puede ser debido a tu conexión a Internet o que nuestros servicios estén fuera de línea.",
	linkText: "Si el problema persiste, por favor <0>contacta soporte</0>",
	reloadButton: "Recargar las tareas"
};
var es$1 = {
	userSettingsWebapp: userSettingsWebapp,
	accountSettings: accountSettings,
	activityTimelineItem: activityTimelineItem,
	addLeadToActivityModal: addLeadToActivityModal,
	addToCalendarModal: addToCalendarModal,
	ai: ai,
	assignUserModal: assignUserModal,
	bobjectSelector: bobjectSelector,
	bobjectTypes: bobjectTypes,
	bobjects: bobjects,
	brandedButtons: brandedButtons,
	cadence: cadence,
	calendar: calendar,
	callDetail: callDetail,
	captureSalesforce: captureSalesforce,
	changeStatusModal: changeStatusModal,
	changeTzModal: changeTzModal,
	emailTemplatePage: emailTemplatePage,
	common: common,
	confirmCloseModal: confirmCloseModal,
	contactFlowModal: contactFlowModal,
	copyText: copyText,
	crmUpdatesModal: crmUpdatesModal,
	dates: dates,
	dayCalendar: dayCalendar,
	detailedActivity: detailedActivity,
	dialer: dialer,
	emailModal: emailModal,
	en: en,
	es: es,
	extendedScreen: extendedScreen,
	extension: extension,
	generalSearchBar: generalSearchBar,
	helperKeys: helperKeys,
	home: home,
	languages: languages,
	leftBar: leftBar,
	linkedInDetail: linkedInDetail,
	meetingModal: meetingModal,
	minimizableModals: minimizableModals,
	misc: misc,
	notes: notes,
	playbook: playbook,
	quickLogModal: quickLogModal,
	quickStartGuide: quickStartGuide,
	richTextEditor: richTextEditor,
	scheduler: scheduler,
	sidePeek: sidePeek,
	smartEmailModal: smartEmailModal,
	tasks: tasks,
	taskFeed: taskFeed,
	templateSelector: templateSelector,
	tooltips: tooltips,
	validation: validation,
	welcomeScreens: welcomeScreens,
	notifications: notifications,
	reminders: reminders,
	whatsapp: whatsapp,
	wizards: wizards,
	tasksTitles: tasksTitles,
	signatures: signatures,
	userSetings: userSetings,
	taskFeedErrorPage: taskFeedErrorPage
};

export { en$2 as en, es$1 as es };
                                 
