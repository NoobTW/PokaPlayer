const template = {
    getSpinner: () => `<div class="mdui-spinner mdui-spinner-colorful mdui-center" style="margin-top:80px"></div>`,
    parseHome: data => {
        let r = ``;
        if (data.albums.length > 0) {
            r += `<h1>專輯</h1>`
            r += template.parseAlbums(data.albums)
        }
        if (data.artists.length > 0) {
            r += `<h1>演出者</h1>`
            r += template.parseArtists(data.artists)
        }
        if (data.composers.length > 0) {
            r += `<h1>作曲者</h1>`
            r += template.parseComposers(data.composers)
        }
        if (data.playlists.length > 0) {
            r += `<h1>播放清單</h1>`
            r += template.parsePlaylists(data.playlists)
        }
        if (data.folders.length > 0) {
            r += `<h1>資料夾</h1>`
            r += template.parseFolder(data.folders)
        }
        if (data.songs.length > 0) {
            r += `<h1>歌曲</h1>`
            r += template.parseSongs(data.songs)
        }
        return r
    },
    parseFolder: folders => {
        let html = `<ul class="mdui-list">`
        for (i = 0; i < folders.length; i++) {
            let folder = folders[i]
            html += `<li class="mdui-list-item mdui-ripple" href="folder/${folder.source}/${folder.id}" data-navigo>
                        <i class="mdui-list-item-avatar mdui-icon material-icons">folder</i>
                        <div class="mdui-list-item-content">${folder.name}</div>
                    </li>`　
        }
        html += `</ul>`
        return html
    },
    parseSongs: songs => {
        songList = songs
        let html = `<div class="songs"><div class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3 mdui-row-lg-4">`
        for (i = 0; i < songs.length; i++) {
            let song = songs[i]
            let title = song.name
            let artist = song.artist
            let clickAction = `onclick="playSongs(songList,'${song.id}');router.navigate('now');" `
            let addAction = `onclick="addSong(songList,'${song.id}')"`

            let img = window.localStorage["imgRes"] == "true" ? '' :
                `<div class="mdui-list-item-avatar" ${clickAction}>
                    <img src="${song.cover}"/>
                </div>`

            html += `
            <div class="mdui-col"><li class="mdui-list-item mdui-ripple">
                ${img}
                <div class="mdui-list-item-content" 
                     ${clickAction}
                     title="${title}${artist?'&#10;'+artist:''}">
                    <div class="mdui-list-item-title mdui-list-item-one-line">${title}</div>
                    <div class="mdui-list-item-text mdui-list-item-one-line">${artist}</div>
                </div>
                <button class="mdui-btn mdui-btn-icon mdui-ripple add" 
                        ${addAction}
                        title="加入這首歌曲到現正播放">
                    <i class="mdui-icon material-icons">add</i>
                </button>
            </li></div>`　
        }
        html += '</div></div>'
        return html

    },
    parseAlbums: albums => {
        let r = '<div class="albums">'
        for (i = 0; i < albums.length; i++) {　
            let album = albums[i]
            let name = album.name
            let artist = album.artist
            let img = window.localStorage["imgRes"] == "true" ? window.localStorage["randomImg"] : album.cover.replace(/'/g, "\\'")
            r += `
               <div class="mdui-card mdui-ripple mdui-hoverable album" 
                   href="album/${album.source}/${encodeURIComponent(album.id)}"  
                   style="background-image:url('${img}');"
                   title="${name}${artist ? '&#10;' + artist : ''}"
                   data-navigo>
                   <div class="mdui-card-media">
                       <div class="mdui-card-media-covered mdui-card-media-covered-gradient">
                           <div class="mdui-card-primary">
                                <div class="mdui-card-primary-title mdui-text-truncate">${name}</div>
                                <div class="mdui-card-primary-subtitle mdui-text-truncate">${artist}</div>
                           </div>
                       </div>
                   </div>
               </div>`
        }
        r += "</div>"
        return r
    },
    parseArtists: artists => {
        let html = `<ul class="mdui-list">`
        for (i = 0; i < artists.length; i++) {
            let artist = artists[i]
            let name = artist.name ? artist.name : "未知"
            let img = window.localStorage["imgRes"] == "true" ? '' : `<div class="mdui-list-item-avatar"><img src="${artist.cover}"/></div>`
            html += `
            <li class="mdui-list-item mdui-ripple" href="artist/${encodeURIComponent(artist.source)}/${encodeURIComponent(name)}" data-navigo>
                ${img}
                <div class="mdui-list-item-content">
                   ${name}
                </div>
            </li>`　
        }
        html += '</ul>'
        return html
    },
    parseComposers: composers => {
        let html = `<ul class="mdui-list">`
        for (i = 0; i < composers.length; i++) {
            let composer = composers[i]
            let name = composer.name ? composer.name : "未知"
            let img = window.localStorage["imgRes"] == "true" ? '' : `<div class="mdui-list-item-avatar"><img src="${composer.cover}"/></div>`
            html += `
            <li class="mdui-list-item mdui-ripple" href="composer/${encodeURIComponent(composer.source)}/${encodeURIComponent(name)}" data-navigo>
                ${img}
                <div class="mdui-list-item-content">
                   ${name}
                </div>
            </li>`　
        }
        html += '</ul>'
        return html
    },
    parsePlaylists: playlists => {
        let html = `<ul class="mdui-list">`
        for (i = 0; i < playlists.length; i++) {
            let playlist = playlists[i]
            html += `
            <li class="mdui-list-item mdui-ripple" href="playlist/${encodeURIComponent(playlist.source)}/${encodeURIComponent(playlist.id)}" data-navigo>
                <i class="mdui-list-item-avatar mdui-icon material-icons">playlist_play</i>
                <div class="mdui-list-item-content">
                   ${playlist.name}
                </div>
            </li>`　
        }
        html += '</ul>'
        return html
    },
}