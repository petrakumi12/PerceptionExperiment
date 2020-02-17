import pandas as pd
import numpy as np
import math

df = pd.read_csv("dict.csv")
# truncate floats to 2 decimals
df['truth'] = df['truth'].apply(lambda val: math.floor(val * 100))
df['err'] = np.where(df["truth"] == df["guess"], 0, np.log2((df['truth'] - df['guess']).abs() + 0.125))
print(df)
df.to_csv("errors.csv")
