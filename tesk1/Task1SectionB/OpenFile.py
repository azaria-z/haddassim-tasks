import pandas as pd
import os
import pyarrow.parquet as pq



# פתיחה רגילה
def Open(file_path):
    file_ext = os.path.splitext(file_path)[1].lower()
    if file_ext == '.csv':
        df = pd.read_csv("time_series.csv")

    elif file_ext == '.parquet':
        df = pd.read_parquet("time_series.parquet")

    else:
        raise ValueError(f"Unsupported file extension: {file_ext}")
    return df


# פתיחה של CKUNKS
def Open_With_Chunk(file_path,chunksize):
    file_ext = os.path.splitext(file_path)[1].lower()
    if file_ext == '.csv':
       return pd.read_csv(
            file_path,
            chunksize=chunksize,
            parse_dates=['timestamp'],
            date_format="%m/%d/%Y %H:%M"
        )
    elif file_ext == '.parquet':
        parquet_file = pq.ParquetFile(file_path)
        
        def parquet_chunk_generator():
            for batch in parquet_file.iter_batches(batch_size=chunksize):
                yield batch.to_pandas()
        
        return parquet_chunk_generator()


        # df = pd.read_parquet(file_path)
        # return df.groupby(df['timestamp'].dt.strftime('%Y-%m-%d'))
        # df = pd.read_parquet(file_path)
        # def parquet_chunk_generator():
        #     for i in range(0, len(df), chunksize):
        #         yield df.iloc[i:i+chunksize]
        # return parquet_chunk_generator()
    else:
        raise ValueError(f"Unsupported file extension: {file_ext}")

