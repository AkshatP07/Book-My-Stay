const path = require('path'); // Ensure path module is required
const downloader = require('image-downloader');

exports.imgLinkDownload = async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const uploadsDir = path.join(__dirname, '..', 'uploads', newName);

    try {
        await downloader.image({
            url: link,
            dest: uploadsDir
        });
        res.status(200).json(newName);
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ message: 'Error downloading image', error });
    }
};
