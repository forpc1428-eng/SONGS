export function renderList(songs){
    const list = document.getElementById("list");

    list.innerHTML = songs.map((s,i)=>`
        <div class="track" onclick="playSong(${i})">
            ${i+1}. ${s.name}
        </div>
    `).join("");
}
