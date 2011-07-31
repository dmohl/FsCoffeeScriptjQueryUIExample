(function() {
  (function(userManager) {
    return userManager.init = function() {
      var allFields, checkLength, checkRegexp, email, name, password, tips, updateTips;
      name = $("#name");
      email = $("#email");
      password = $("#password");
      allFields = $([]).add(name).add(email).add(password);
      tips = $(".validateTips");
      updateTips = function(t) {
        tips.text(t).addClass("ui-state-highlight");
        return setTimeout((function() {
          return tips.removeClass("ui-state-highlight", 1500);
        }), 500);
      };
      checkLength = function(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
          o.addClass("ui-state-error");
          updateTips("Length of " + n + " must be between " + min + " and " + max + ".");
          return false;
        } else {
          return true;
        }
      };
      checkRegexp = function(o, regexp, n) {
        if (!regexp.test(o.val())) {
          o.addClass("ui-state-error");
          updateTips(n);
          return false;
        } else {
          return true;
        }
      };
      $("#dialog-form").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
          "Create an account": function() {
            var bValid;
            bValid = true;
            allFields.removeClass("ui-state-error");
            bValid = bValid && checkLength(name, "username", 3, 16);
            bValid = bValid && checkLength(email, "email", 6, 80);
            bValid = bValid && checkLength(password, "password", 5, 16);
            bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter.");
            bValid = bValid && checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com");
            bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");
            if (bValid) {
              $("#users tbody").append("<tr>" + "<td>" + name.val() + "</td>" + "<td>" + email.val() + "</td>" + "<td>" + password.val() + "</td>" + "</tr>");
              return $(this).dialog("close");
            }
          },
          Cancel: function() {
            return $(this).dialog("close");
          }
        },
        close: function() {
          return allFields.val("").removeClass("ui-state-error");
        }
      });
      $("#dialog:ui-dialog").dialog("destroy");
      return $("#create-user").button().click(function() {
        return $("#dialog-form").dialog("open");
      });
    };
  })(window.userManager = window.userManager || {});
}).call(this);
