	$(function(){
		var lastBlock = 0;
		loadInternetList();
		$(document).on('click', '.windows-client tbody > tr', function(){
    		$('.windows-client tbody > tr').removeClass('sombrear');

		    $(this).toggleClass("sombrear");
		})
		$(document).on('click', '.servergetid', function() {
			$('#pd').html('');
			$('#prop').html('');

			var k = $(this),
				lst = false
			;

			$.ajax({
			  url: './client-samp/includes/data.php?ip=' + $(this).data('server') + '&data=l_by_id',
			  dataType: 'json',
			  type: 'GET',
			  async: false,
			  success: function(data) {
			  	var prp = [
					{'rule':'lagcomp', 	'value':'true'},
					{'rule':'mapname', 	'value':data.info.Map},
					{'rule':'version', 	'value':data.info.Version},
					{'rule':'weather', 	'value':'10'},
					{'rule':'weburl', 	'value':data.info.WebURL},
					{'rule':'worldtime','value':data.info.Time}
				];
			  	$.each(prp, function(key, item) {
			  		$('#prop').append('<tr ' + (lst == true ? 'class="black"' : '') + '><td>' + item.rule + '</td><td>' + item.value + '</td></tr>');
			  		lst = lst == true ? false : true;
			  	}); 

			  	k.children('td#hostname').html(data.info.Hostname);
			  	k.children('td#password').html(getServerStatus(data.info.Password));
			  	k.children('td#players').html(data.info.Players + '/' + data.info.MaxPlayers);
			  	k.children('td#ping').html('[x]');
			  	k.children('td#gamemode').html(data.info.Gamemode.substring(0, 20));
			  	k.children('td#map').html(data.info.Map.substring(0, 15));
			  		
			  	$('#server-info-bottom').html(data.info.IP + ':' + data.info.Port);
			  	$('#server-web-url').html('<a href="' + data.info.WebURL + '">' + data.info.WebURL + '</a>');

				lst = false;

			  	$.each(data.players, function(i, item) {
					$('#pd').append('<tr ' + (lst == true ? 'class="black"' : '') + '><td>' + item.Nickname + '</td><td>' + item.Score + '</td></tr>');
					lst = lst == true ? false : true;
				});

			  }
			});
		});
		function loadInternetList()
		{
			$.getJSON('./client-samp/includes/master-list.php?q=master', function(data) {
				$.each(data, function(i, item) {
					addServer(item);
				});
			});
		}
		function addServer(ip)
		{
			var response = false;
			$.getJSON('./client-samp/includes/data.php?ip=' + ip + '&data=info', function(data)
			{
				response = addServerInfo(data, '[x]');
			});
			return response;
		}
		function addServerInfo(data, ping)
		{
			if(data.Gamemode === 'undefined')
				return false;

			var out = '';

			var block = lastBlock == 1 ? 'black' : '';

			out = out + '<tr id="d_' + data.ServerID + '" class="servergetid ' + block + '" data-server="' + data.ServerID + '">';
			out = out + '<td id="password" class="icon-password">' + getServerStatus(data.Password) + '</td>';
			out = out + '<td id="hostname">' + data.Hostname + '</td>';
			out = out + '<td id="players">' + data.Players + '/' + data.MaxPlayers + '</td>';
			out = out + '<td id="ping">' + ping + '</td>';
			out = out + '<td id="gamemode">' + data.Gamemode.substring(0, 20) + '</td>';
			out = out + '<td id="map">' + data.Map.substring(0, 15) + '</td>';
			out = out + '</tr>';

			lastBlock = lastBlock == 1 ? 0 : 1;

			$('#sl05').append(out);
			return true;	
		}
		function getServerStatus(lock)
		{
			return (lock == 0 ? '<img src="client-samp/images/server-unlocked.jpg" alt="+"></img>' : '<img src="client-samp/images/server-locked.jpg" alt="-"></img>');
		}
	});