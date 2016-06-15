from datetime import datetime

class Common():
    def make_plain_dict(self,obj):
        row = obj.__dict__.copy()
        del row['_sa_instance_state']
        for key in row:
            if isinstance(row[key], datetime):
                row[key] = int(row[key].strftime("%s"))
            
        return row
