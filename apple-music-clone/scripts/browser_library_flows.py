"""Complete recorded library journeys, using a fixture only for the first step."""
from playwright.async_api import expect
from browser_live_fidelity import start, record

async def begin(page, journey, prefix='e72be564'):
    await start(page, prefix)
    await record(page, journey, prefix, 'Initial recorded state')

async def navigate(page, name, scene, navigation='Music library'):
    await page.get_by_role('navigation', name=navigation, exact=True).get_by_role('button', name=name, exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', scene)
    playlists = page.get_by_role('navigation', name='Playlists', exact=True)
    await expect(playlists.get_by_role('button', name='Favourite Songs', exact=True)).to_be_visible()
    await expect(playlists.get_by_role('button', name='Emotional Songs', exact=True)).to_be_visible()

async def artists(page, context):
    journey = '9decd1cd-artists'
    await begin(page, journey)
    await navigate(page, 'Artists', 'artists')
    panel = page.locator('.library-artist-content')
    await expect(panel.get_by_role('heading')).to_contain_text('Ariana Grande')
    await expect(panel.locator('.media-card')).to_have_count(1)
    await record(page, journey, '0df0d2a2', 'Select Artists from the sidebar')
    await page.get_by_role('navigation', name='Library artists', exact=True).get_by_role('button', name='Olivia Rodrigo', exact=False).click()
    await expect(panel.get_by_role('heading')).to_contain_text('Olivia Rodrigo')
    await expect(panel.locator('.media-card')).to_have_count(2)
    await record(page, journey, '610af644', 'Select Olivia Rodrigo from the artist list')

async def albums(page, context):
    journey = '2797b86f-albums'
    await begin(page, journey)
    await navigate(page, 'Albums', 'albums')
    await expect(page.locator('.library-grid .media-card')).to_have_count(6)
    await record(page, journey, '5d3db7ca', 'Select Albums from the sidebar')

async def songs(page, context):
    journey = '0e305ee9-songs'
    await begin(page, journey)
    await navigate(page, 'Songs', 'songs')
    # The saved Songs original contains eight rows, not ten.
    assert await page.locator('.library-song-table .table-song-title').all_text_contents() == [
        'BIRDS OF A FEATHER', 'Cruel Summer', 'deja vu', 'jealousy, jealousy',
        'So Easy (To Fall In Love)', 'stupid song', "we can't be friends (wait for your love)", 'WILDFLOWER']
    await expect(page.get_by_role('table', name='Songs', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='stupid song', exact=True)).to_be_visible()
    await record(page, journey, '92589389', 'Select Songs from the sidebar')

async def music_videos(page, context):
    journey = '51ec8869-music-videos'
    await begin(page, journey)
    await navigate(page, 'Music Videos', 'videos')
    cards = page.locator('.library-grid .media-card')
    assert await cards.locator('.card-title').all_text_contents() == ['Begged (Lyric Video)', 'BIRDS OF A FEATHER', 'You Need To Calm Down']
    for card in await cards.all():
        box = await card.locator('.card-art-button').bounding_box()
        assert box and abs(box['width'] / box['height'] - 16 / 9) < .02, box
    await record(page, journey, '4e857921', 'Select Music Videos from the sidebar')

async def all_playlists(page, context):
    journey = 'b49a8505-all-playlists'
    await begin(page, journey)
    await navigate(page, 'All Playlists', 'playlists', 'Playlists')
    assert await page.locator('.library-grid .card-title').all_text_contents() == ['Emotional Songs', 'Favourite Songs']
    await record(page, journey, '8a2a4241', 'Select All Playlists from the sidebar')

async def playlist_detail(page, context):
    journey = 'c12bd09a-playlist-detail'
    await begin(page, journey, '8a2a4241')
    await page.locator('.library-grid').get_by_role('button', name='Emotional Songs', exact=True).first.click()
    await expect(page.get_by_role('heading', name='Emotional Songs', exact=True)).to_be_visible()
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['stupid song', 'the cure', 'drivers license']
    await expect(page.locator('.playlist-description')).to_have_text('just in case I wanna cry')
    await record(page, journey, 'a573d1ab', 'Open the Emotional Songs playlist card')

async def suggested_song(page, context):
    journey = '14785972-add-suggested-song'
    await begin(page, journey, 'a573d1ab')
    await page.get_by_role('button', name='Add vampire to Emotional Songs', exact=True).click()
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['stupid song', 'the cure', 'drivers license', 'vampire']
    await expect(page.locator('.playlist-count')).to_have_text('4 songs, 16 minutes')
    await expect(page.get_by_role('button', name='Add vampire to Emotional Songs', exact=True)).to_have_count(0)
    await record(page, journey, '5044abe5', 'Add vampire using the suggested-song control')

async def favourite_songs(page, context):
    journey = '6f857f3f-favourite-songs'
    await begin(page, journey, 'a917d88f')
    await navigate(page, 'Favourite Songs', 'favourites', 'Playlists')
    assert await page.locator('.track-table .table-song-title').all_text_contents() == ['BIRDS OF A FEATHER', 'deja vu', 'WILDFLOWER', 'stupid song']
    await expect(page.get_by_role('heading', name='Favourite Songs', exact=False)).to_be_visible()
    await record(page, journey, 'bde65d33', 'Open Favourite Songs from the sidebar')

CASES = [('recorded-library-artists', artists), ('recorded-library-albums', albums),
         ('recorded-library-songs', songs), ('recorded-library-videos', music_videos),
         ('recorded-all-playlists', all_playlists), ('recorded-playlist-detail', playlist_detail),
         ('recorded-suggested-song', suggested_song), ('recorded-favourite-songs', favourite_songs)]
