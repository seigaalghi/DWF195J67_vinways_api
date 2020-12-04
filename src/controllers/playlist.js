const { Playlist } = require('../../models');

// =================================================================================
// ADD PLAYLIST
// =================================================================================

exports.addPlaylist = async (req, res) => {
  const { musicId } = req.params;
  const userId = req.user.id;
  try {
    const check = await Playlist.findOne({ where: { userId, musicId } });

    if (check) {
      return res.status(400).json({
        status: 'failed',
        message: 'Already added to playlist',
      });
    }

    const playlist = await Playlist.create({
      userId: userId,
      musicId: musicId,
    });

    if (!playlist) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to add to playlist, please try again',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Added Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// =================================================================================
// REMOVE LIKE
// =================================================================================

exports.removePlaylist = async (req, res) => {
  const { musicId } = req.params;
  const userId = req.user.id;
  try {
    const check = await Playlist.findOne({ where: { userId, musicId } });

    if (!check) {
      return res.status(400).json({
        status: 'failed',
        message: 'Not added to playlist yet',
      });
    }

    const like = await Playlist.destroy({ where: { userId, musicId } });

    if (!like) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to remove from playlist, please try again',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Removed Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};
