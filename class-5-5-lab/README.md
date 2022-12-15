# Laboratorio

## Setup

### Setup Confluence

1. Create cluster
2. Create topic
3. Create API KEY

### Setup CockroachDB

1. Create Cluster with serverless database.

Install CockroachDB CLI, [instructions](https://github.com/cockroachdb/homebrew-tap):

```bash
brew tap cockroachdb/tap
brew install cockroach
brew install ccloud
```

Create example database

```bash
cockroach workload init movr "<STRING_CONNECTION>"
cockroach sql --url "<STRING_CONNECTION>"
```

Setup database ChangeFeed.

```sql
SHOW DATABASES;
SHOW TABLES FROM movr;
SELECT * FROM movr.users LIMIT 10;
SET database = movr;    
SET CLUSTER SETTING kv.rangefeed.enabled = true;

CREATE CHANGEFEED FOR TABLE users 
INTO 'kafka://pkc-n00kk.us-east-1.aws.confluent.cloud:9092?topic_name=users&tls_enabled=true&sasl_enabled=true&sasl_user=6UQTPPCFNT7QL6MA&sasl_password=TzWdnaNO%2BUa4Qa8zD4%2FFmAN6ChPt70T03Y4dxtQV0JcNImhge7s%2B%2FBxLJja0gE0l&sasl_mechanism=PLAIN' 
WITH updated, diff;

UPDATE users SET address = 'new address' WHERE id = 'ae147ae1-47ae-4800-8000-000000000022';
```