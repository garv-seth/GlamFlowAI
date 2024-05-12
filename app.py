import couchbase.search as search
from couchbase.auth import PasswordAuthenticator
from couchbase.cluster import Cluster, ClusterOptions
from couchbase.vector_search import VectorQuery, VectorSearch
from flask import Flask, jsonify, request
from sentence_transformers import SentenceTransformer

app = Flask(__name__)  # Flask app setup should be at the top

try:
    authenticator = PasswordAuthenticator(username='<<username>>', password='<<password>>')
    cluster = Cluster.connect('couchbases://cb.x33pb0j5lynqz56t.cloud.couchbase.com',
                               ClusterOptions(authenticator=authenticator))
    bucket = cluster.bucket('glam-flow-db')
    scope = bucket.scope('glam-flow-bucket')
    collection = scope.collection('glam-flow-collection')
    print("Successfully connected to Couchbase cluster and bucket.")
except Exception as e:
    print(f"Error connecting to Couchbase cluster or bucket: {e}")

# Check if cluster is successfully connected before accessing bucket
if Cluster is not None:
    # Pre-trained model for sentence embedding generation
    model = SentenceTransformer('all-mpnet-base-v2')

    def generate_salon_embedding(text_data):
        """
        Pre-processes text data and generates vector embedding using SentenceTransformer
        """
        processed_text = text_data.lower().strip()
        embedding = model.encode(processed_text)
        return embedding.tolist()  # Convert to list for storage in Couchbase

    def fetch_salons():
        """
        Fetches salon data from Couchbase
        """
        salons = []
        query = "SELECT * FROM `glam-flow-collection`"
        result = collection.query(query)
        for row in result:
            salons.append(row)
        return salons

    def ensure_vector_index():
        """
        Ensures vector index exists, creates it if not
        """
        manager = collection.bucket_manager()
        indexes = manager.get_all_indexes()
        index_names = [index.name for index in indexes]
        if 'salon_vector_index' not in index_names:
            manager.create_index('salon_vector_index', fields=[{'field': 'embedding', 'indexType': 'vector'}])

    def search_salons_by_embedding(user_embedding):
        """
        Performs vector search in Couchbase using user embedding
        """
        ensure_vector_index()
        search_index = 'salon_vector_index'
        search_req = search.SearchRequest.create(search.MatchNoneQuery()).with_vector_search(
            VectorSearch.from_vector_query(VectorQuery('embedding', user_embedding, num_candidates=10))
        )
        result = scope.search(search_index, search_req, SearchOptions(limit=10))

        # Process search results
        results = []
        for row in result.rows():
            salon_data = row.value
            salon_data['score'] = row.score  # Add score to each salon data
            results.append(salon_data)

        # Sort results by score in descending order
        results.sort(key=lambda x: x['score'], reverse=True)
        return results

    @app.route('/api/search', methods=['POST'])
    def search_salons():
        try:
            # Get user search criteria from request body
            data = request.get_json()
            service_type = data['serviceType']
            location = data['location']
            date = data['date']  # Assuming date format is appropriate
            time = data['time']  # Assuming time format is appropriate

            # Combine relevant fields for search text
            search_text = f"{service_type} {location} {date} {time}"

            # Generate user embedding from search text
            user_embedding = generate_salon_embedding(search_text)

            # Perform vector search in Couchbase
            results = search_salons_by_embedding(user_embedding)

            # Return search results (salon data with scores) in JSON format
            return jsonify(results)
        except Exception as e:
            # Handle the exception here
            print(f"Error in search_salons: {e}")
            return jsonify({"error": str(e)}), 500

else:
    print("Error: Couchbase cluster connection not established.")

if __name__ == '__main__':
    app.run(debug=True)