FSR.surveydefs = [{
    name: 'browse',
	section: 'main',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: .5,
        lf: 0
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    language: {
        locale: 'en'
    },
    
    exclude: {
        local: ['localization', 'buyflow'],
        referer: []
    },
   
    invite: {
        content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\"><b>Thank you for visiting our site!</b><br><br>You have been selected to take part in a customer satisfaction survey. This survey is conducted by an independent company, ForeSee Results.<br><br>The feedback obtained from this survey will help us to enhance our website. All results are strictly confidential.<br><br></div></div></BODY></HTML>',
        width: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        timeout: 0,
        buttons: {
            accept: 'Continue',
            decline: 'No thanks'
        },
        hideOnClick: false,
        css: 'foresee-dhtml.css',
        hide: []
    },
    
    tracker: {
        width: '500',
        height: '325',
        timeout: 4,
        adjust: false,
        url: 'tracker.html'
    },
    
    survey: {
        width: 550,
        height: 600,
        loading: false
    },
    
    qualifier: {
        location: 'local',
        width: '500',
        height: '300',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
        css: false
    },
    
    cancel: {
        url: 'cancel.html',
        width: '500',
        height: '300'
    },
    
    loading: {
        url: 'survey_loading.html'
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    meta: {
        referer: false,
        terms: false,
        ref_url: false,
        url: false,
        url_params: false
    },
    
    events: {
        enabled: true,
        id: false
    },
    
    pool: 100,
    
    previous: false,
    
    mode: 'first-party'
};
