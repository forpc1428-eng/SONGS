export async function loadSongs(){
    const res = await fetch(`https://api.github.com/repos/forpc1428-eng/SONGS/contents/`);
    const data = await res.json();

    return data
        .filter(f => f.name.endsWith('.mp3'))
        .map(f => ({
            name: f.name.replace('.mp3','').replace(/_/g,' '),
            url: `https://media.githubusercontent.com/media/forpc1428-eng/SONGS/main/${encodeURIComponent(f.name)}`
        }));
}
