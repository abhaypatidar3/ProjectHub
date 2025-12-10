import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FaTimes, FaCheck } from 'react-icons/fa';

const ImageCropper = ({ imageSrc, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 90,
    aspect: 450 / 350  // Maintain 450:350 ratio
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const onImageLoad = (e) => {
    imgRef.current = e.currentTarget;
    
    // Set initial crop to center
    const { width, height } = e.currentTarget;
    const cropWidth = Math.min(width, height * (450 / 350));
    const cropHeight = cropWidth * (350 / 450);
    
    setCrop({
      unit: 'px',
      width: cropWidth,
      height: cropHeight,
      x:  (width - cropWidth) / 2,
      y: (height - cropHeight) / 2,
      aspect: 450 / 350
    });
  };

  const getCroppedImage = () => {
    if (!completedCrop || !imgRef.current) {
      return null;
    }

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef. current.naturalHeight / imgRef. current.height;
    
    // Set canvas to exact 450x350
    canvas.width = 450;
    canvas.height = 350;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      450,
      350
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          blob.name = 'cropped-image.jpg';
          resolve(blob);
        }
      }, 'image/jpeg', 0.9);
    });
  };

  const handleCropComplete = async () => {
    const croppedBlob = await getCroppedImage();
    if (croppedBlob) {
      onCropComplete(croppedBlob);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Crop Image</h2>
              <p className="text-sm text-gray-600 mt-1">
                Drag to adjust the crop area.  Final size will be 450x350 pixels.
              </p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Crop Area */}
          <div className="flex justify-center bg-gray-100 p-4 rounded-lg mb-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={450 / 350}
              className="max-w-full"
            >
              <img
                ref={imgRef}
                src={imageSrc}
                onLoad={onImageLoad}
                alt="Crop preview"
                className="max-w-full h-auto"
                style={{ maxHeight: '60vh' }}
              />
            </ReactCrop>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Cropping Information</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Aspect Ratio: 450:350 (locked)</li>
                    <li>Final Output: 450 x 350 pixels</li>
                    <li>Drag the corners to resize</li>
                    <li>Drag the center to move</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleCropComplete}
              disabled={!completedCrop}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaCheck /> Apply Crop
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center gap-2"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;