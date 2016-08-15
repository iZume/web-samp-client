/*
  * Autor: Zume (http://forum.sa-mp.com/member.php?u=146395)
*/

$(function() {
    function b() {
        $.getJSON("http://nextgaming.net/samp-client/client-samp/includes/master-list.php?q=master", function(a) {
            $.each(a, function(a, b) {
                c(b)
            })
        })
    }

    function c(a) {
        var b = !1;
        return $.getJSON("http://nextgaming.net/samp-client/client-samp/includes/data.php?ip=" + a + "&data=info", function(a) {
            b = d(a, "[x]")
        }), b
    }

    function d(b, c) {
        if ("undefined" === b.Gamemode) return !1;
        var d = "",
            f = 1 == a ? "black" : "";
        return d = d + '<tr id="d_' + b.ServerID + '" class="servergetid ' + f + '" data-server="' + b.ServerID + '">', d = d + '<td id="password" class="icon-password">' + e(b.Password) + "</td>", d = d + '<td id="hostname">' + b.Hostname + "</td>", d = d + '<td id="players">' + b.Players + "/" + b.MaxPlayers + "</td>", d = d + '<td id="ping">' + c + "</td>", d = d + '<td id="gamemode">' + b.Gamemode.substring(0, 20) + "</td>", d = d + '<td id="map">' + b.Map.substring(0, 15) + "</td>", d += "</tr>", a = 1 == a ? 0 : 1, $("#sl05").append(d), !0
    }

    function e(a) {
        return 0 == a ? '<img src="client-samp/images/server-unlocked.jpg" alt="+"></img>' : '<img src="client-samp/images/server-locked.jpg" alt="-"></img>'
    }
    var a = 0;
    b(), $(document).on("click", ".windows-client tbody > tr", function() {
        $(".windows-client tbody > tr").removeClass("sombrear"), $(this).toggleClass("sombrear")
    }), $(document).on("click", ".servergetid", function() {
        $("#pd").html(""), $("#prop").html("");
        var a = $(this),
            b = !1;
        $.ajax({
            url: "http://nextgaming.net/samp-client/client-samp/includes/data.php?ip=" + $(this).data("server") + "&data=l_by_id",
            dataType: "json",
            type: "GET",
            async: !1,
            success: function(c) {
                var d = [
                	{rule: "lagcomp", value: "true"}, 
	                {rule: "mapname", value: c.info.Map}, 
	                {rule: "version", value: c.info.Version}, 
	                {rule: "weather", value: "10"}, 
	                {rule: "weburl", value: c.info.WebURL}, 
	                {rule: "worldtime", value: c.info.Time}
                ];
                $.each(d, function(a, c) {
                    $("#prop").append("<tr " + (1 == b ? 'class="black"' : "") + "><td>" + c.rule + "</td><td>" + c.value + "</td></tr>"), b = 1 != b
                }), a.children("td#hostname").html(c.info.Hostname), a.children("td#password").html(e(c.info.Password)), a.children("td#players").html(c.info.Players + "/" + c.info.MaxPlayers), a.children("td#ping").html("[x]"), a.children("td#gamemode").html(c.info.Gamemode.substring(0, 20)), a.children("td#map").html(c.info.Map.substring(0, 15)), $("#server-info-bottom").html(c.info.IP + ":" + c.info.Port), $("#server-web-url").html('<a href="' + c.info.WebURL + '">' + c.info.WebURL + "</a>"), b = !1, $.each(c.players, function(a, c) {
                    $("#pd").append("<tr " + (1 == b ? 'class="black"' : "") + "><td>" + c.Nickname + "</td><td>" + c.Score + "</td></tr>"), b = 1 != b
                })
            }
        })
    })
});