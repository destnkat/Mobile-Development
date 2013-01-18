
    function saveFormData(frm) {
     
        var savedItems = {},
            itemsArray = ['playlist_name', 'playlist_description', 'playlist_genre', 'playlist_date', 'playlist_priority', 'user_id'],
            playlistId = getRandomPlaylistId(),
            consolidated,
            dialogBox;

        for(var i = 0; i < itemsArray.length; i++ ) {
            var key = itemsArray[i];
            savedItems[key] = document.getElementById(key).value;
        }

        savedItems['enabled'] = checkEnabledStatus();
        consolidated = JSON.stringify(savedItems);

        localStorage.setItem(playlistId, consolidated);

        return false;  // Don't submit the Form through the PHP
    }

    function checkEnabledStatus() {
        if(document.getElementById('playlist_enabled').checked) {
            return '1';
        } else {
            return '0';
        }
    }

    function clearFormData(evt) {
        localStorage.clear();
    }

    function displayFormData() {

        var items = [];
        var addWrapper = document.getElementById('add_playlist');
        var displayWrapper = document.getElementById('display_playlists');
        var existingData = document.getElementById('existing_data');
        var output = '';

        addWrapper.style.display = "none";
        displayWrapper.style.display = "block";

        if(localStorage.length == 0 ){
            output += "<p>No Playlists have been entered</p>";
        }
        for(var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = JSON.parse(localStorage[key]);

            var enabled = value.enabled == "1" ? "Active" : "Inactive";
            output += "<p><strong>Name: </strong> " +value.playlist_name +  "</p>";
            output += "<p><strong>Description: </strong>" + value.playlist_description + "</p>";
            output += "<p><strong>Genre: </strong>" + value.playlist_genre + "</p>";
            output += "<p><strong>Created: </strong>" + value.playlist_date + "</p>";
            output += "<p><strong>Priority: </strong>" + value.playlist_priority + "</p>";
            output += "<p><strong>Status: </strong>" + enabled + "</p><hr/>";

        }

        existingData.innerHTML = output;

    }

    function populateSelectForm() {
        var genres = ["country", "rap", "classical", "pop"];
        var genreSelect = document.getElementById('playlist_genre');

        if(genreSelect) {

            for(var i = 0; i < genres.length; i++) {
                var opt = document.createElement('option');
                opt.setAttribute('value', genres[i]);
                opt.innerHTML = genres[i];
                genreSelect.appendChild(opt);
            }
        }
    }

    function getRandomPlaylistId() {
        return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    }

    function bindButtons() {
        var clear = document.getElementById('clear_data');
        if (clear)
            clear.addEventListener('click', clearFormData);

        var display = document.getElementById('display_data');
        if (display)
            display.addEventListener('click', displayFormData);

        var addNew = document.getElementById('add_new_playlist');
        if (addNew) {
            addNew.addEventListener('click', function(){
               window.location.href = "addItem.html";
            });
        }

        var home = document.getElementById('home_button');
        if (home) {
            home.addEventListener('click', function(){
                window.location.href = 'index.html';
            });
        }
    }

function init() {
    populateSelectForm();
    bindButtons();
}

window.onload = init;
