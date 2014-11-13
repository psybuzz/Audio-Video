print 'Starting...'

from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
print 'Loaded libraries'
nba = NaiveBayesAnalyzer()

def analyse(sentence):
	blob = TextBlob(sentence, analyzer=nba)
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
	caption = ''.join(chunk[2:]).replace("'", "")

	# Convert times to seconds
	sstart = start.split(':')
	start = int(sstart[0])*3600 + int(sstart[1])*60 + int(sstart[2].split(',')[0])
	send = end.split(':')
	end = int(send[0])*3600 + int(send[1])*60 + int(send[2].split(',')[0])

	sent = analyse(caption)
	result = {
		'start': start,
		'end': end,
		'text': caption,
		'pos': sent.p_pos
	}
	results.append(str(result))

	print caption

# Save the results
print results
rf = open('results_'+subtitleFile, 'w')
rf.write(str(results))
rf.close()
