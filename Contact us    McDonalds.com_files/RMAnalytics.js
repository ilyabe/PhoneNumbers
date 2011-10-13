// Silverlight Web Analytics
// Created by Michael S. Scherotter, Microsoft Corporation mischero@microsoft.com
// License: Creative Commons Attribution License: http://creativecommons.org/licenses/by/3.0/

// SilverlightAnalytics class
// Usage:
// - Use this to randomly select a XAML file for A/B Testing
//   //For 75% of the traffic, try a SceneA or SceneB
//   m_xaml = SilverlightAnalytics.SelectXaml(0.75, "Scene.Xaml", new Array("SceneA.xaml", "SceneB.xaml"));
//
// - Put this on the HTML page after the vendor-specific page tag code
//   var analytics = new SilverlightAnalytics(TrackWithGoogleAnalytics, m_xaml);
//   analytics.TrackSilverlightVersion(createSilverlight);
//
// - Use this to track an event on a visual element
//   var analytics = new SilverlightAnalytics(LogEventToWebTrends, m_xaml);
//   analytics.TrackElementEvent(rootElement, "SourceCode", "MouseLeftButtonUp");
//
// - Use this to track media consumption 
//   var analytics = new SilverlightAnalytics(LogEventToWebTrends, m_xaml);
//   var movie = rootElement.findName("Movie");
//   analytics.TrackMedia(movie, 5);

/// <reference path="Default.html.js" />
/// <reference path="SilverlightAnalytics.js" />

// Constructor
function SilverlightAnalytics(trackingFunction, xamlName)
{
    /// <summary>Create a SilverlightAnalytics object</summary>
    /// <param name="trackingFunction" type="function">A function to call that will log a named event to the analytics service. It should take a single string as a parameter</param>
    /// <param name="xamlName" type="string">the name of the Xaml for A/B testing. (optional)</param>
    /// <returns type="SilverlightAnalytics">a new SilverlightAnalytics object</returns>
    
    this.TrackingFunction = trackingFunction;   
    this.XamlName = xamlName; 
}

SilverlightAnalytics.SelectXaml = function(percentOfTraffic, originalXaml, alternateArray)
{
    /// <summary>Select a XAML file for A/B testing</summary>
    /// <param name="percentOfTraffic" type="Number">percent of traffic (0.0-1.0) to try alternate xaml</param>
    /// <param name="originalXaml" type="string">an Array of XAML file names [new Array("option1.xaml", "option2.xaml")]</param>
    /// <returns type="string">the name of the XAML file to use</returns>

    if (Math.random() > percentOfTraffic)
    {
        return originalXaml;
    }

    // The two alternatives
    var sources = new Array("SceneA.xaml", "SceneB.xaml");
    
    var index = Math.floor(Math.random() * alternateArray.length);
    
    return alternateArray[index];
}

SilverlightAnalytics.prototype.TrackSilverlightVersion = function(createFunction)
{
    this.CreateFunction = createFunction;
    
    ///<summary>Track the Silverlight version.  If Silverlight is not installed, install it.</summary>
    ///<param name="createFunction" type="function">function to call to create Silverlight control (typically createSilverlight)</param>
    
    if (Silverlight.isInstalled("3.0"))
    {
        this.TrackEvent("SLInstalled/3.0");
    }
	else if (Silverlight.isInstalled("2.0"))
    {
        this.TrackEvent("SLInstalled/2.0");
    }
    else if (Silverlight.isInstalled("1.1"))
    {
        this.TrackEvent("SLInstalled/1.1");
    }
    else if (Silverlight.isInstalled("1.0"))
    {
        this.TrackEvent("SLInstalled/10");
    }
    else
    {   
        this._IsSL10Installed();
    }
}

SilverlightAnalytics.prototype._IsSL10Installed = function()
{
    if (Silverlight.isInstalled("1.0"))
    {
        this.TrackEvent("SLInstalled/NewInstall");
        this.TrackEvent("SLInstalled/10");
        
        this.CreateFunction();
        
        return;
    }
    
    setTimeout(Silverlight.createDelegate(this, this._IsSL10Installed, 5000));
}

// Methods
SilverlightAnalytics.prototype.TrackEvent = function(eventName)
{
    /// <summary>Track an event using the vendor-specific tracking function</summary>
    /// <param name="eventName" type="string">the event to track</param>
    if (this.XamlName)
    {
        this.TrackingFunction(this.XamlName + "/" + eventName);
    }
    else
    {
        this.TrackingFunction(eventName);
    }
}


SilverlightAnalytics.prototype.TrackElementEvent = function(rootElement, elementName, eventName)
{
    /// <summary>Track an event on a named element</summary>
    /// <param name="rootElement" type="DependencyObject">the root Element from which to search for elementName</param>
    /// <param name="elementName" type="string">the name of the element to listen for events on</param>
    /// <param name="eventName" type="string">the name of the event to listen to</param>
    /// <returns type="integer">A token that is returned from the function, which you can optionally retain as a variable. If you intend to call RemoveEventListener to remove the handler, you will need this token.</returns>
    
    var element = rootElement.findName(elementName);
    
    var token = element.addEventListener(eventName, Silverlight.createDelegate(this, this._TrackElementName));
    
    return token;
}

SilverlightAnalytics.prototype.TrackMedia = function(mediaElement, interval)
{
    /// <summary>Track media consumption by logging events every interval seconds and logging every time the media buffers.</summary>
    /// <param name="mediaElement" type="MediaElement">a media element</param>
    /// <param name="interval" type="integer">interval in seconds</param>
    /// <returns type="SilverlightAnalytics.MediaTracker">a media tracker object</returns>
    
    var mediaTracker = new SilverlightAnalytics.MediaTracker(interval, this, mediaElement);
    
    return mediaTracker;
}

SilverlightAnalytics.MediaTracker = function(interval, analytics, mediaElement)
{
    /// <summary>create a new Media Tracker object</summary>
    /// <param name="interval" type="integer">interval in seconds</param>
    /// <param name="analytics" type="SilverlightAnalytics">the Silverlight Analytics object</param>
    /// <param name="mediaElement" type="MediaElement">a media element</param>
    /// <returns type="SilverlightAnalytics.MediaTracker">a new media tracker object</returns>
    
    this.Analytics = analytics;
    this.Interval = interval;
    this.InitialBuffering = true;

    //Once the media has opened, we can add markers to it.        
    mediaElement.addEventListener("MediaOpened", Silverlight.createDelegate(this, this._MediaOpened));
    
    // When a marker is reached, then we log an event.
	mediaElement.addEventListener("MarkerReached", Silverlight.createDelegate(this, this._MarkerReached));
	
	// If the media buffers, then we log an event
	mediaElement.AddEventListener("CurrentStateChanged", Silverlight.createDelegate(this, this._CurrentStateChanged));
	
	mediaElement.AddEventListener("BufferingProgressChanged", Silverlight.createDelegate(this, this._BufferingProgressChanged));
}

// Implementation


SilverlightAnalytics.prototype._TrackElementName = function(sender, eventArgs)
{
    this.TrackEvent(sender.Name);
}



SilverlightAnalytics.MediaTracker.prototype._BufferingProgressChanged = function(sender, eventArgs)
{
    var errorDiv = document.getElementById("errorLocation");
    var progress = "Buffering " + Math.floor(sender.BufferingProgress * 100 + 0.5).toString() + "%";
    errorDiv.innerHTML = progress;
}

SilverlightAnalytics.MediaTracker.prototype._CurrentStateChanged = function(sender, eventArgs)
{
    if (sender.CurrentState == "Buffering")
    {
        if (this.InitialBuffering)
        {
            // initial buffering is acceptable
            this.InitialBuffering = false;
        }
        else
        {
            this.Analytics.TrackEvent("MediaBuffering");
        }
    }
}


SilverlightAnalytics.MediaTracker.prototype._MediaOpened = function(media, eventArgs)
{
    this.InitialBuffering = true;
    
    if (media.NaturalDuration == null)
    {
        return;
    }
    
    var markers = media.markers;
    
    var duration = media.NaturalDuration.Seconds;
    
    var content = media.getHost().content;
    
    for (var i = 0 ; i <= duration; i = i + this.Interval)
    {
        var markerXaml = "<TimelineMarker Type='Name' Text='Saw" + this.PadZeros(i,duration) + "' Time='0:00:00'/>";

        var marker = content.CreateFromXaml(markerXaml);
        
        marker.time.seconds = i;
        
        markers.Add(marker);
    }
}

SilverlightAnalytics.MediaTracker.prototype.PadZeros = function(number, maximum)
{
    /// <summary>create a string from a number padding it with zeros</summary>
    /// <param name="interval" type="integer">a number to convert into a string</param>
    /// <param name="maximum" type="number">the maximum value for the number</param>
    /// <returns type="string">a string with 0 padding a number like 001, 002, 010, 100</returns>
    var length = Math.ceil(maximum).toString().length;
    
    var stringNumber = number.toString();
    
    while (stringNumber.length < length)
    {
        stringNumber = "0" + stringNumber;
    }
    
    return stringNumber;
}

SilverlightAnalytics.MediaTracker.prototype._MarkerReached = function(sender, eventArgs)
{
    this.Analytics.TrackEvent(eventArgs.Marker.Text);
}


//
// User Code.
//
function LogEventToWebTrends(eventName)
{
///<summary>Track a RIA event using WebTrends</summary>
///<param name="eventName" type="String">the name of the event</param>
var eventuri = "/mcnuggets/" + eventName;
dcsMultiTrack("DCS.dcsuri", eventuri, "WT.ti", eventName);
}

//Add event handlers to each button
function AddButtonHandlers(rootElement, name)
{
    var element = rootElement.findName(name);

    // These are the event handlers for user feedback and business logic    
    element.addEventListener("MouseEnter", MouseOverButton);
    element.addEventListener("MouseLeave", MouseLeaveButton);
    element.addEventListener("MouseLeftButtonUp", ClickButton);
	element.addEventListener("Loaded", SLLoaded);
}

function OnDownloadProgressChanged(sender, eventArgs)
{
    var downloadProgressScale = sender.findName("DownloadProgressScale");
    
    downloadProgressScale.ScaleX = sender.downloadProgress;
    
    if (sender.downloadProgress >= 1.0)
    {
        var progress = sender.findName("Progress");
        
        progress.Visibility = "Collapsed";
    }
}

function MouseOverButton(sender, eventArgs)
{
    var fill = sender.findName(sender.Name + "Fill");
    fill.Color = "Yellow";
}

function MouseLeaveButton(sender, eventArgs)
{
    var fill = sender.findName(sender.Name + "Fill");
    fill.Color = "#FFF90808";
}

function ClickButton(sender, eventArgs)
{
    window.open(sender.Tag, "_blank");
}

function SLLoaded(sender, eventArgs)
{
    window.open(sender.Tag, "_blank");
}
