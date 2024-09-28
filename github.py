import requests
import json

def get_default_repositories():
   file = open("default_repos.json", "r")
   repositories = json.load(file)
   filtered_repos = filter_relevant_repositories(repositories)
   sorted_repos = sorted(filtered_repos, key=lambda x: x['pushed_at'], reverse=True)
   
   return sorted_repos

def get_user_repositories(username):
    url = f'https://api.github.com/users/{username}/repos'
    response = requests.get(url, verify=True)

    if response.status_code == 200:
        repositories = response.json()
        filtered_repos = filter_relevant_repositories(repositories)
        sorted_repos = sorted(filtered_repos, key=lambda x: x['pushed_at'], reverse=True)

        return sorted_repos
    else:
        return get_default_repositories()

def filter_relevant_repositories(repos):
    # Filter out repositories without a programming language and other criteria
    relevant_repos = [repo for repo in repos if repo.get('language') and not repo.get('name').lower().startswith('readme')]
    return relevant_repos


def get_language_color(language):
    # Load language-color mappings from JSON file
    with open('static/languages.json') as f:
        color_map = json.load(f)
    return color_map.get(language, '#333')  # Default to a neutral color if not found


