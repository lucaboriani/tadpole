//@ts-nocheck

// Some environments don't have global Buffer (e.g. React Native).
// Solution would be installing npm modules "buffer" and "stream" explicitly.
import { Buffer } from 'buffer';
import * as bomHandling from './bom-handling';
import { extendNode } from './extend-node';
import enableStreams from './streams';
import encodings from './encodings';

const iconv = {};
export default iconv;

// All codecs and aliases are kept here, keyed by encoding name/alias.
// They are lazy loaded in `iconv.getCodec` from `encodings/index.js`.
iconv.encodings = encodings;

// Characters emitted in case of error.
iconv.defaultCharUnicode = '�';
iconv.defaultCharSingleByte = '?';

// Public API.
iconv.encode = function encode(str, encoding, options) {
	str = '' + (str || ''); // Ensure string.

	var encoder = iconv.getEncoder(encoding, options);

	var res = encoder.write(str);
	var trail = encoder.end();

	return trail && trail.length > 0 ? Buffer.concat([res, trail]) : res;
};

iconv.decode = function decode(buf, encoding, options) {
	if (typeof buf === 'string') {
		if (!iconv.skipDecodeWarning) {
			console.error(
				'Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding'
			);
			iconv.skipDecodeWarning = true;
		}

		buf = new Buffer('' + (buf || ''), 'binary'); // Ensure buffer.
	}

	var decoder = iconv.getDecoder(encoding, options);

	var res = decoder.write(buf);
	var trail = decoder.end();

	return trail ? res + trail : res;
};

iconv.encodingExists = function encodingExists(enc) {
	try {
		iconv.getCodec(enc);
		return true;
	} catch (e) {
		return false;
	}
};

// Legacy aliases to convert functions
iconv.toEncoding = iconv.encode;
iconv.fromEncoding = iconv.decode;

// Search for a codec in iconv.encodings. Cache codec data in iconv._codecDataCache.
iconv._codecDataCache = {};
iconv.getCodec = function getCodec(encoding) {
	// Canonicalize encoding name: strip all non-alphanumeric chars and appended year.
	var enc = ('' + encoding).toLowerCase().replace(/[^0-9a-z]|:\d{4}$/g, '');

	// Traverse iconv.encodings to find actual codec.
	var codecOptions = {};
	// eslint-disable-next-line no-constant-condition
	while (true) {
		var codec = iconv._codecDataCache[enc];
		if (codec) return codec;

		var codecDef = iconv.encodings[enc];

		switch (typeof codecDef) {
			case 'string': // Direct alias to other encoding.
				enc = codecDef;
				break;

			case 'object': // Alias with options. Can be layered.
				for (var key in codecDef) codecOptions[key] = codecDef[key];

				if (!codecOptions.encodingName) codecOptions.encodingName = enc;

				enc = codecDef.type;
				break;

			case 'function': // Codec itself.
				if (!codecOptions.encodingName) codecOptions.encodingName = enc;

				// The codec function must load all tables and return object with .encoder and .decoder methods.
				// It'll be called only once (for each different options object).
				codec = new codecDef(codecOptions, iconv);

				iconv._codecDataCache[codecOptions.encodingName] = codec; // Save it to be reused later.
				return codec;

			default:
				throw new Error("Encoding not recognized: '" + encoding + "' (searched as: '" + enc + "')");
		}
	}
};

iconv.getEncoder = function getEncoder(encoding, options) {
	var codec = iconv.getCodec(encoding),
		encoder = new codec.encoder(options, codec);

	if (codec.bomAware && options && options.addBOM)
		encoder = new bomHandling.PrependBOM(encoder, options);

	return encoder;
};

iconv.getDecoder = function getDecoder(encoding, options) {
	var codec = iconv.getCodec(encoding),
		decoder = new codec.decoder(options, codec);

	if (codec.bomAware && !(options && options.stripBOM === false))
		decoder = new bomHandling.StripBOM(decoder, options);

	return decoder;
};

// Load extensions in Node. All of them are omitted in Browserify build via 'browser' field in package.json.
var nodeVer = typeof process !== 'undefined' && process.versions && process.versions.node;
if (nodeVer) {
	// Load streaming support in Node v0.10+
	var nodeVerArr = nodeVer.split('.').map(Number);
	if (nodeVerArr[0] > 0 || nodeVerArr[1] >= 10) {
		enableStreams(iconv);
	}
	// Load Node primitive extensions.
	extendNode(iconv);
}

// eslint-disable-next-line no-constant-condition
if ('Ā' != '\u0100') {
	console.error(
		'iconv-lite warning: javascript files are loaded not with utf-8 encoding. See https://github.com/ashtuchkin/iconv-lite/wiki/Javascript-source-file-encodings for more info.'
	);
}