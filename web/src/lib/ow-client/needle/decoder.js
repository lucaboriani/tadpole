import { inherits } from 'util';
import * as stream from 'stream';
import * as iconv from './iconv-lite/';

var regex = /(?:charset|encoding)\s*=\s*['"]? *([\w\-]+)/i;

inherits(StreamDecoder, stream.Transform);

function StreamDecoder(charset) {
	if (!(this instanceof StreamDecoder)) return new StreamDecoder(charset);

	stream.Transform.call(this, charset);
	this.charset = charset;
	this.parsed_chunk = false;
}

StreamDecoder.prototype._transform = function (chunk, encoding, done) {
	var res, found;

	// try get charset from chunk, just once
	if (this.charset == 'iso-8859-1' && !this.parsed_chunk) {
		this.parsed_chunk = true;

		var matches = regex.exec(chunk.toString());
		if (matches) {
			found = matches[1].toLowerCase();
			this.charset = found == 'utf-8' ? 'utf8' : found;
		}
	}

	try {
		res = iconv.decode(chunk, this.charset);
	} catch (e) {
		// something went wrong, just return original chunk
		res = chunk;
	}

	this.push(res);
	done();
};

export default function (charset) {
	return new StreamDecoder(charset);
}
