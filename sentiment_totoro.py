print 'Starting...'

from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
print 'Loaded libraries'

def analyse(sentence):
	blob = TextBlob(sentence, analyzer=NaiveBayesAnalyzer())
	return blob.sentiment

# Load the subtitle file
subtitleFile = 'Totoro_subtitles.txt'
f = open(subtitleFile, 'r')
print 'Loaded', subtitleFile

# Parse the file into chunks
lines = ''.join(f.readlines())
chunks = [x.splitlines() for x in lines.split('\r\n\r\n')]	# Each chunk is a window of time.
f.close()

# Parse each chunk into a result object
results = []
for chunk in chunks:
	times = chunk[1].split(' --> ')
	start = times[0]
	end = times[1]
	caption = ''.join(chunk[2:])

	sent = analyse(caption)
	result = {
		'start': start,
		'end': end,
		'text': caption,
		'pos': sent.p_pos,
		'neg': sent.p_neg
	}
	results.append(str(result))

	print caption

# Save the results
print results
rf = open('results_'+subtitleFile, 'w')
rf.write(str(results))
rf.close()
