
    function saveFormData() {

        var savedItems = {},
            itemsArray = ['playlist_name', 'playlist_description', 'playlist_genre', 'playlist_date', 'playlist_priority', 'user_id'],
            playlistId = getRandomPlaylistId(),
            consolidated;

        for(var i = 0; i < itemsArray.length; i++ ) {
            var key = itemsArray[i];
            savedItems[key] = document.getElementById(key).value;
        }

        savedItems['enabled'] = checkEnabledStatus();
        consolidated = JSON.stringify(savedItems);

        localStorage.setItem(playlistId, consolidated);
        var conf = document.getElementById('confirmation_error');
        conf.style.display = 'block';
        conf.innerHTML = '<p>Your Playlist has been successfully saved!</p>';

        return false;  // Don't submit the Form through the PHP
    }

    function validateTheForm(frm) {
        var error = false;
        var conf = document.getElementById('confirmation_error');
        var arr = ['lbl_name', 'lbl_description', 'lbl_genre'];
        var errors = [];


        for (var i= 0; i < arr.length; i++) {
            var tmplbl = document.getElementById(arr[i]);
            removeClass(tmplbl, 'hasError');
        }

        conf.style.display = 'block';

        //Clear the Error DIV
        conf.innerHTML = '';

        if(frm.playlist_name.value == '') {
            error = true;
            errors.push('lbl_name');
        }

        if (frm.playlist_description.value == '') {
            error = true;
            errors.push('lbl_description');
        }

        if(frm.playlist_genre.value === 'choose one') {
            error = true;
            errors.push('lbl_genre');
        }

        if (error) {
            conf.innerHTML = '<p>There are issues with your submission. Please see the highlighted fields and' +
                ' make the necessary updates</p>';

            conf.style.display = 'block';

            for(var i=0; i < errors.length; i++) {
                var tmpLbl = document.getElementById(errors[i]);
                addClass(tmpLbl, 'hasError');
            }


        } else {
            saveFormData();
        }

        return false;


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
            output += "<p><strong>Status: </strong>" + enabled + "</p>";
            output += "<input type='button' value='edit playlist' onclick='editLocalStorageItem(this.id);' id='edit_" + key + "' />";
            output += "<input type='button' value='delete playlist' onclick='deleteLocalStorageItem(this.id);' id='delete_" + key + "' />  <hr/>";


        }

        existingData.innerHTML = output;

    }

    function populateSelectForm() {
        var genres = ["choose one","country", "rap", "classical", "pop"];
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

    function hasClass(el, name) {
        return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className);
    }

    function addClass(el, name)
    {
        if (!hasClass(el, name)) { el.className += (el.className ? ' ' : '') +name; }
    }

    function removeClass(el, name)
    {
        if (hasClass(el, name)) {
            el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
        }
    }

    function deleteLocalStorageItem(id) {
        var delim = id.indexOf('_');
        var cleanId = id.substring(delim + 1, id.length);
        localStorage.removeItem(cleanId);

        displayFormData();
    }

    function editLocalStorageItem(id) {
        var delim = id.indexOf('_');
        var cleanId = id.substring(delim + 1, id.length);
        var retrieveItem = localStorage.getItem(cleanId);

        var addWrapper = document.getElementById('add_playlist');
        var displayWrapper = document.getElementById('display_playlists');

        addWrapper.style.display = "block";
        displayWrapper.style.display = "none";

    }

function init() {
    populateSelectForm();
    bindButtons();
}

window.onload = init;
