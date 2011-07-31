((userManager) ->
  userManager.init = ->
    name = $("#name")
    email = $("#email")
    password = $("#password")
    allFields = $([]).add(name).add(email).add password
    tips = $(".validateTips")

    updateTips = (t) ->
      tips.text(t).addClass "ui-state-highlight"
      setTimeout (->
        tips.removeClass "ui-state-highlight", 1500
      ), 500

    checkLength = (o, n, min, max) ->
      if o.val().length > max or o.val().length < min
        o.addClass "ui-state-error"
        updateTips "Length of #{n} must be between #{min} and #{max}."
        false
      else true

    checkRegexp = (o, regexp, n) ->
      unless regexp.test o.val()
        o.addClass "ui-state-error"
        updateTips n
        false
      else true

    $("#dialog-form").dialog 
      autoOpen: false
      height: 300
      width: 350
      modal: true
      buttons: 
        "Create an account": ->
          bValid = true
          allFields.removeClass "ui-state-error"
          bValid = bValid and checkLength name, "username", 3, 16
          bValid = bValid and checkLength email, "email", 6, 80
          bValid = bValid and checkLength password, "password", 5, 16
          bValid = bValid and checkRegexp name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter."
          bValid = bValid and checkRegexp email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com"
          bValid = bValid and checkRegexp password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9"
          if bValid
            $("#users tbody").append "<tr>" + "<td>" + name.val() + "</td>" + "<td>" + email.val() + "</td>" + "<td>" + password.val() + "</td>" + "</tr>"
            $(this).dialog "close"
        
        Cancel: ->
          $(this).dialog "close"
      
      close: ->
        allFields.val("").removeClass "ui-state-error"
    
    $("#dialog:ui-dialog").dialog "destroy"

    $("#create-user").button().click ->
      $("#dialog-form").dialog "open"
) window.userManager = window.userManager or {}