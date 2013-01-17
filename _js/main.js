/**
 *
 * @param frm
 * @return {Boolean}
 */
    function saveFormData(frm) {
    var savedItems = {};
    var itemsArray = ['playlist_name', 'playlist_description', 'playlist_genre', 'playlist_date', 'playlist_priority', 'user_id'];

    for(var i = 0; i < itemsArray.length; i++ ) {
        var key = itemsArray[i];
        savedItems[key] = document.getElementById(key).value;
    }
        savedItems['playlistId'] = getRandomPlaylistId();

       var consolidated = JSON.stringify(savedItems);

        return false;
    }

    function clearFormData() {
        localStorage.clear();
    }

    function displayFormData() {

    }

    function getRandomPlaylistId() {
        return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    }
